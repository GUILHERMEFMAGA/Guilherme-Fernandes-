import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { useTypewriter } from "../hooks/useTypewriter";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
});

export function Hero({ avatar }: { avatar?: string }) {
  const role = useTypewriter(profile.roles);

  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-16">
      {/* Fundo: grade + "blobs" de luz */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="animate-float pointer-events-none absolute -top-32 left-1/4 -z-10 size-[28rem] rounded-full bg-brand-500/25 blur-[120px] dark:bg-brand-600/30" />
      <div className="animate-float-slow pointer-events-none absolute right-0 bottom-0 -z-10 size-[24rem] rounded-full bg-accent-500/20 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {profile.available && (
            <motion.div {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Disponível para novos projetos
            </motion.div>
          )}

          <motion.p {...fadeUp(0.05)} className="mb-3 font-mono text-sm text-zinc-500 dark:text-zinc-400">
            Olá, mundo! 👋 Eu sou
          </motion.p>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
            {profile.name.split(" ")[0]} <span className="text-gradient">{profile.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.div {...fadeUp(0.2)} className="mt-5 h-8 font-mono text-lg text-zinc-700 sm:text-xl dark:text-zinc-200">
            <span className="text-brand-600 dark:text-brand-400">&gt;</span> {role}
            <span className="caret ml-0.5 inline-block h-5 w-[3px] translate-y-0.5 bg-brand-500" />
          </motion.div>

          <motion.p {...fadeUp(0.3)} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {profile.headline}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projetos" className="btn-primary group">
              Ver projetos
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#contato" className="btn-ghost">
              <Mail className="size-4" /> Fale comigo
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download className="btn-ghost">
                <Download className="size-4" /> Currículo
              </a>
            )}
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="mt-10 flex items-center gap-5 text-zinc-500 dark:text-zinc-400">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-zinc-900 dark:hover:text-white">
              <GithubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-zinc-900 dark:hover:text-white">
              <LinkedinIcon />
            </a>
            <span className="h-4 w-px bg-zinc-300 dark:bg-white/15" />
            <span className="inline-flex items-center gap-1.5 text-sm">
              <MapPin className="size-4" /> {profile.location}
            </span>
          </motion.div>
        </div>

        {/* Avatar com anel em gradiente animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block"
        >
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-[2.5rem] bg-gradient-to-tr from-brand-500 via-fuchsia-500 to-accent-500 opacity-80 blur-md" />
          <div className="absolute inset-[3px] overflow-hidden rounded-[2.4rem] bg-zinc-100 dark:bg-zinc-900">
            {avatar ? (
              <img src={avatar} alt={profile.name} className="size-full object-cover" />
            ) : (
              <div className="grid size-full place-items-center text-7xl font-extrabold text-gradient">{profile.initials}</div>
            )}
          </div>
          <div className="card absolute -bottom-5 -left-6 px-4 py-3 shadow-xl">
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">stack.favorita</p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">React · TS · Node</p>
          </div>
          <div className="card absolute -top-4 -right-4 px-4 py-3 shadow-xl">
            <p className="text-2xl">⚡</p>
          </div>
        </motion.div>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para baixo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-zinc-400 transition hover:text-zinc-900 dark:hover:text-white"
      >
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
}
