import { profile } from "../data/profile";
import { Reveal, SectionHeader } from "./Reveal";

export function About() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionHeader eyebrow="01. sobre mim" title="Código com propósito." />
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 self-start lg:grid-cols-1">
          {profile.stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.08} className="card p-5 lg:flex lg:items-center lg:gap-5">
              <p className="text-3xl font-extrabold text-gradient sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-zinc-500 lg:mt-0 dark:text-zinc-400">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
