import { Briefcase, GraduationCap } from "lucide-react";
import { timeline } from "../data/profile";
import { Reveal, SectionHeader } from "./Reveal";

export function Experience() {
  return (
    <section id="trajetoria" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionHeader eyebrow="04. trajetória" title="Por onde andei." />
      <ol className="relative ml-3 border-l border-zinc-200 dark:border-white/10">
        {timeline.map((t, i) => {
          const Icon = t.type === "work" ? Briefcase : GraduationCap;
          return (
            <Reveal key={i} delay={i * 0.1} className="relative mb-10 pl-10 last:mb-0">
              <span className="absolute top-0.5 -left-[17px] grid size-8 place-items-center rounded-full border border-zinc-200 bg-zinc-50 text-brand-600 dark:border-white/10 dark:bg-[#0a0a0f] dark:text-brand-400">
                <Icon className="size-4" />
              </span>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{t.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
                {t.title} <span className="font-normal text-brand-600 dark:text-brand-400">· {t.place}</span>
              </h3>
              <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">{t.description}</p>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
