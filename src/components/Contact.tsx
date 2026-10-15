import { useState, type FormEvent } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  // Sem backend: abre o cliente de e-mail com a mensagem preenchida.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Contato pelo portfólio — ${d.get("name")}`);
    const body = encodeURIComponent(`${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const input =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-zinc-500";

  return (
    <section id="contato" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <Reveal className="card relative overflow-hidden p-8 sm:p-12">
        <div className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-brand-500/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-accent-500/15 blur-[100px]" />

        <div className="relative grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-sm font-medium text-brand-600 dark:text-brand-400">05. contato</p>
            <h2 className="section-title">
              Vamos construir <span className="text-gradient">algo juntos?</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Tem um projeto em mente, uma vaga ou só quer trocar uma ideia? Minha caixa de entrada está sempre aberta.
            </p>

            <button onClick={copyEmail} className="card mt-8 flex w-full items-center gap-4 p-4 text-left transition hover:border-brand-500/40 sm:w-auto">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Mail className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block text-xs text-zinc-500 dark:text-zinc-400">E-mail</span>
                <span className="block font-medium text-zinc-900 dark:text-white">{profile.email}</span>
              </span>
              {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4 text-zinc-400" />}
            </button>

            <div className="mt-6 flex gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <GithubIcon className="size-4" /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Nome</span>
                <input name="name" required placeholder="Seu nome" className={input} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">E-mail</span>
                <input name="email" type="email" required placeholder="voce@email.com" className={input} />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Mensagem</span>
              <textarea name="message" required rows={5} placeholder="Conte um pouco sobre sua ideia..." className={`${input} resize-none`} />
            </label>
            <button type="submit" className="btn-primary w-full py-3">
              <Send className="size-4" /> Enviar mensagem
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
