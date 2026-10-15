import { motion, type HTMLMotionProps } from "framer-motion";

/** Faz o conteúdo surgir suavemente quando entra na tela. */
export function Reveal({ delay = 0, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-sm font-medium text-brand-600 dark:text-brand-400">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{subtitle}</p>}
    </Reveal>
  );
}
