import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, GitFork, Star, ExternalLink } from "lucide-react";
import { featuredProjects, profile } from "../data/profile";
import type { Repo } from "../hooks/useGithub";
import { GithubIcon } from "./BrandIcons";
import { Reveal, SectionHeader } from "./Reveal";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#563d7c", Python: "#3572A5",
  Java: "#b07219", "C#": "#178600", PHP: "#4F5D95", Go: "#00ADD8", Rust: "#dea584", Shell: "#89e051",
};

const timeAgo = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "hoje";
  if (days < 30) return `há ${days} dia${days > 1 ? "s" : ""}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `há ${months} ${months > 1 ? "meses" : "mês"}`;
  const y = Math.floor(months / 12);
  return `há ${y} ano${y > 1 ? "s" : ""}`;
};

export function Projects({ repos, loading, error }: { repos: Repo[]; loading: boolean; error: string | null }) {
  const [filter, setFilter] = useState("Todos");
  const languages = useMemo(
    () => ["Todos", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[]))],
    [repos],
  );
  const shown = filter === "Todos" ? repos : repos.filter((r) => r.language === filter);

  return (
    <section id="projetos" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionHeader eyebrow="03. projetos" title="Coisas que eu construí." subtitle="Uma seleção de trabalhos em destaque — e, logo abaixo, tudo o que está público no meu GitHub." />

      {/* Destaques */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="card group flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5">
            <div className={`relative grid h-44 place-items-center bg-gradient-to-br ${p.gradient}`}>
              <div className="bg-grid absolute inset-0 opacity-40 mix-blend-overlay" />
              <span className="text-6xl drop-shadow-lg transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">{p.emoji}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-md bg-brand-500/10 px-2 py-0.5 font-mono text-xs text-brand-700 dark:text-brand-300">{t}</li>
                ))}
              </ul>
              {(p.repo || p.demo) && (
                <div className="mt-5 flex gap-4 border-t border-zinc-200 pt-4 text-sm font-medium dark:border-white/10">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      <GithubIcon className="size-4" /> Código
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      <ExternalLink className="size-4" /> Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Repositórios do GitHub (ao vivo) */}
      <Reveal className="mt-20 mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold text-zinc-900 dark:text-white">
            <GithubIcon /> Direto do GitHub
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Atualizado automaticamente via API pública.</p>
        </div>
        {languages.length > 2 && (
          <div className="flex flex-wrap gap-1.5">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  filter === l
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-zinc-200/70 text-zinc-600 hover:bg-zinc-300/70 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </Reveal>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card h-36 animate-pulse p-5">
              <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-white/10" />
              <div className="mt-4 h-3 w-full rounded bg-zinc-200 dark:bg-white/5" />
              <div className="mt-2 h-3 w-2/3 rounded bg-zinc-200 dark:bg-white/5" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="card p-6 text-sm text-zinc-600 dark:text-zinc-400">
          Não consegui carregar os repositórios agora ({error}).{" "}
          <a href={profile.github} target="_blank" rel="noreferrer" className="font-medium text-brand-600 underline dark:text-brand-400">
            Veja direto no GitHub →
          </a>
        </div>
      ) : (
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((r) => (
              <motion.a
                layout
                key={r.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="card group flex flex-col p-5 hover:border-brand-500/40 dark:hover:border-brand-400/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="truncate font-mono text-sm font-semibold text-zinc-900 dark:text-white">{r.name}</h4>
                  <ArrowUpRight className="size-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-500" />
                </div>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {r.description && r.description.trim().length > 1 ? r.description : "Sem descrição ainda."}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                  {r.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full" style={{ background: LANG_COLORS[r.language] ?? "#8b5cf6" }} />
                      {r.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1"><Star className="size-3.5" />{r.stargazers_count}</span>
                  <span className="inline-flex items-center gap-1"><GitFork className="size-3.5" />{r.forks_count}</span>
                  <span className="ml-auto">{timeAgo(r.updated_at)}</span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
