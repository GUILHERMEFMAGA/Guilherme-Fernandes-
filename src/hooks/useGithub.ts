import { useEffect, useState } from "react";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  topics?: string[];
};

export type GithubUser = {
  avatar_url: string;
  public_repos: number;
  followers: number;
  html_url: string;
};

type State = { repos: Repo[]; user: GithubUser | null; loading: boolean; error: string | null };

const CACHE_KEY = (u: string) => `gh-cache:${u}`;
const CACHE_TTL = 1000 * 60 * 30; // 30 min — evita estourar o limite da API pública

export function useGithub(username: string): State {
  const [state, setState] = useState<State>({ repos: [], user: null, loading: true, error: null });

  useEffect(() => {
    const ctrl = new AbortController();

    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY(username)) ?? "null");
      if (cached && Date.now() - cached.t < CACHE_TTL) {
        setState({ repos: cached.repos, user: cached.user, loading: false, error: null });
        return;
      }
    } catch {
      /* ignore */
    }

    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: ctrl.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { signal: ctrl.signal }),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error(`GitHub respondeu ${uRes.status}/${rRes.status}`);
        const user: GithubUser = await uRes.json();
        const repos: Repo[] = (await rRes.json()).filter((r: Repo) => !r.fork);
        sessionStorage.setItem(CACHE_KEY(username), JSON.stringify({ t: Date.now(), user, repos }));
        setState({ repos, user, loading: false, error: null });
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setState((s) => ({ ...s, loading: false, error: (e as Error).message }));
      }
    })();

    return () => ctrl.abort();
  }, [username]);

  return state;
}
