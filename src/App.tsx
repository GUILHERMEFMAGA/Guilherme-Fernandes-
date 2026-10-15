import { motion, useScroll, useSpring } from "framer-motion";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { profile } from "./data/profile";
import { useGithub } from "./hooks/useGithub";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  const { user, repos, loading, error } = useGithub(profile.githubUser);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-500 via-fuchsia-500 to-accent-500"
      />
      <a href="#sobre" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-zinc-900">
        Pular para o conteúdo
      </a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero avatar={user?.avatar_url} />
        <About />
        <Skills />
        <Projects repos={repos} loading={loading} error={error} />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
