import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchSourceCatalog, getSourceDefinitions, sourceKeys } from "./catalog-providers.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const snapshotPath = join(root, "data", "catalog-snapshot.json");
let memorySnapshot = null;
let memoryMtime = 0;

function emptySnapshot() {
  return { updatedAt: null, offers: [], sources: getSourceDefinitions().map((source) => ({ ...source, lastSyncAt: null, error: null })) };
}

export async function readSnapshot() {
  try {
    const fileInfo = await stat(snapshotPath);
    if (memorySnapshot && memoryMtime === fileInfo.mtimeMs) return memorySnapshot;
    memorySnapshot = JSON.parse(await readFile(snapshotPath, "utf8"));
    memoryMtime = fileInfo.mtimeMs;
    return memorySnapshot;
  } catch {
    memorySnapshot = emptySnapshot();
    memoryMtime = 0;
    return memorySnapshot;
  }
}

async function writeSnapshot(snapshot) {
  await mkdir(dirname(snapshotPath), { recursive: true });
  const tempPath = `${snapshotPath}.tmp`;
  await writeFile(tempPath, JSON.stringify(snapshot, null, 2));
  await rename(tempPath, snapshotPath);
  memorySnapshot = snapshot;
  memoryMtime = (await stat(snapshotPath)).mtimeMs;
  return snapshot;
}

function searchTerms() {
  return (process.env.MAVVRI_SYNC_QUERIES || "ofertas,eletrônicos,casa cozinha,moda beleza,esporte,games")
    .split(",")
    .map((query) => query.trim())
    .filter(Boolean)
    .slice(0, 12);
}

export async function syncCatalog({ sources = sourceKeys } = {}) {
  const queries = searchTerms();
  const previous = await readSnapshot();
  const sourceMetadata = new Map(previous.sources.map((source) => [source.key, source]));
  const offersById = new Map();
  const successfulSources = new Set();

  for (const source of sources) {
    const metadata = { ...(sourceMetadata.get(source) || { key: source }), lastSyncAt: new Date().toISOString(), error: null };
    try {
      for (const query of queries) {
        const catalog = await fetchSourceCatalog(source, { query, limit: 50, offset: 0 });
        for (const offer of catalog.items) offersById.set(String(offer.id), offer);
        metadata.configured = catalog.connector.available;
        metadata.label = catalog.connector.label;
        if (!catalog.connector.available) {
          metadata.error = catalog.connector.message || "Conector não configurado.";
        } else {
          successfulSources.add(source);
        }
      }
    } catch (error) {
      metadata.error = error.message || "Falha ao sincronizar fonte.";
    }
    sourceMetadata.set(source, metadata);
  }

  // Preserve the last successful snapshot when a connector times out or is not configured.
  const untouchedOffers = previous.offers.filter((offer) => !successfulSources.has(offer.source));
  const snapshot = {
    updatedAt: new Date().toISOString(),
    offers: [...untouchedOffers, ...offersById.values()],
    sources: sourceKeys.map((key) => sourceMetadata.get(key) || { key, lastSyncAt: null, error: null }),
  };
  return writeSnapshot(snapshot);
}

export function querySnapshot(snapshot, { source = "all", query = "", limit = 24, offset = 0 }) {
  const normalized = query.toLocaleLowerCase("pt-BR").trim();
  const selectedSources = source === "all" ? sourceKeys : [source];
  const filtered = snapshot.offers.filter((offer) => {
    const sourceMatch = selectedSources.includes(offer.source);
    const searchText = `${offer.name} ${offer.category} ${offer.store}`.toLocaleLowerCase("pt-BR");
    return sourceMatch && (!normalized || searchText.includes(normalized));
  });
  return {
    items: filtered.slice(offset, offset + limit),
    paging: { offset, limit, total: filtered.length, nextOffset: offset + limit < filtered.length ? offset + limit : null },
  };
}
