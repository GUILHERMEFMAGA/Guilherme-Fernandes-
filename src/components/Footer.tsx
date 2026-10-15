import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8 dark:border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-zinc-500 sm:flex-row sm:px-8 dark:text-zinc-500">
        <p>© {new Date().getFullYear()} {profile.name}. Feito com React, TypeScript e muito ☕.</p>
        <a href="#inicio" className="font-mono transition hover:text-zinc-900 dark:hover:text-white">voltar ao topo ↑</a>
      </div>
    </footer>
  );
}
