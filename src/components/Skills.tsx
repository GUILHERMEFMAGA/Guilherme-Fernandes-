import { Code2, Palette, Server, Wrench } from "lucide-react";
import { skills, type SkillGroup } from "../data/profile";
import { Reveal, SectionHeader } from "./Reveal";

const ICONS: Record<SkillGroup["icon"], typeof Code2> = { code: Code2, server: Server, tools: Wrench, design: Palette };

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow="02. skills" title="Minha caixa de ferramentas." subtitle="Tecnologias que uso no dia a dia para tirar ideias do papel." />
        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((g, i) => {
            const Icon = ICONS[g.icon];
            return (
              <Reveal key={g.title} delay={i * 0.08} className="card group relative overflow-hidden p-7">
                <div className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-brand-500/0 blur-3xl transition-colors duration-500 group-hover:bg-brand-500/20" />
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{g.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 transition hover:border-brand-500/50 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:text-brand-300"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
