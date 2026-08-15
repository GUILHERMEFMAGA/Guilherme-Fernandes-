import { syncCatalog } from "../catalog-store.mjs";
import { sourceKeys } from "../catalog-providers.mjs";

const requested = process.argv.find((argument) => argument.startsWith("--sources="));
const sources = requested
  ? requested.replace("--sources=", "").split(",").map((source) => source.trim()).filter((source) => sourceKeys.includes(source))
  : sourceKeys;

const snapshot = await syncCatalog({ sources });
console.log(JSON.stringify({ updatedAt: snapshot.updatedAt, offers: snapshot.offers.length, sources: snapshot.sources }, null, 2));
