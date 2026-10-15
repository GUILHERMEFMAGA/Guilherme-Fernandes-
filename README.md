# Guilherme-Fernandes-
<img width="800" height="450" alt="b_deixe_um_pouco_mais_-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/a73e7bcd-c59c-463b-8b60-aae618b7e519" />

## 🚀 Portfólio pessoal

Site de portfólio feito com **React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion**.

### ✨ Funcionalidades
- Hero com efeito de digitação e avatar puxado do GitHub
- Tema claro/escuro (lembra a preferência do visitante)
- Navegação com destaque da seção ativa e barra de progresso de rolagem
- Projetos em destaque + **repositórios carregados ao vivo da API do GitHub** (com filtro por linguagem e cache)
- Linha do tempo de trajetória
- Formulário de contato (abre o e-mail já preenchido) e botão de copiar e-mail
- Animações ao rolar, responsivo e acessível (respeita `prefers-reduced-motion`)

### 🛠️ Rodando localmente
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a versão de produção em /dist
```

### ✏️ Personalizando
Todo o conteúdo fica em **`src/data/profile.ts`**: nome, e-mail, LinkedIn, textos do "Sobre", skills, projetos em destaque e trajetória.
Para adicionar um currículo, coloque o PDF em `public/` e preencha `resumeUrl`.

### 🌐 Deploy
O workflow `.github/workflows/deploy.yml` publica o site automaticamente no **GitHub Pages** a cada push na `main`.
Ative em *Settings → Pages → Source: GitHub Actions*. O site ficará em:
`https://guilhermefmaga.github.io/Guilherme-Fernandes-/`
