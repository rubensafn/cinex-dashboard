# Cinex Dashboard — CLAUDE.md

## Stack
- React 19 + Vite 8
- Recharts para gráficos
- Deploy: Vercel
- Domínio: dashboard.cinexcinemas.com.br (a definir)

## Cliente
- Cinex Cinemas — Goiânia, GO
- Instagram: @cinex.goiania
- Fonte: Brinnan (todas as variações em /src/fonts/)
- Cores: roxo profundo (#090310) + magenta (#E040FB)

## Fluxo de branches

| Branch | Ambiente | URL |
|--------|----------|-----|
| `main` | Produção | dashboard.cinexcinemas.com.br |
| `dev`  | Preview  | URL automática Vercel |

### Regra: nunca commitar direto na `main`. Sempre trabalhar na `dev`.

```bash
git checkout dev
git add .
git commit -m "feat: descrição"
git push
# Quando aprovado:
git checkout main && git merge dev && git push && git checkout dev
```

## Estrutura do projeto

```
src/
  App.jsx        # Toda a aplicação (único arquivo)
  index.css      # Estilos globais + font-face Brinnan
  main.jsx       # Entry point
  fonts/         # Brinnan Regular, Bold, Black, Light
public/
  favicon.png          # Ícone Cinex
  logo-cinex-gradient.png  # Logo com fundo gradiente roxo
  logo-cinex-branca.png    # Logo versão branca
api/
  instagram.js   # Vercel Serverless — proxy Instagram Graph API
```

## Instagram API (dados reais)

Para ativar os dados reais do @cinex.goiania:

1. Acesse developers.facebook.com → criar app
2. Adicionar produto: Instagram Graph API
3. Conectar conta business @cinex.goiania
4. Gerar long-lived access token
5. Adicionar nas variáveis de ambiente do Vercel:
   - `INSTAGRAM_ACCESS_TOKEN`
   - `INSTAGRAM_ACCOUNT_ID`

## Módulos do dashboard

| Módulo | Descrição |
|--------|-----------|
| Visão Geral | Cards de stats + gráfico de seguidores |
| Projetos | Kanban de campanhas com 11 status + drag & drop |
| Conteúdo | Gestor de posts por plataforma |
| Calendário | Visualização mensal de conteúdo agendado |
| Analytics | Instagram real (@cinex.goiania) + gráficos |
| Concorrentes | Cinemas concorrentes em Goiânia |
| Notícias | Notícias reais do setor cinematográfico |

## Cores principais

```js
accent:  "#E040FB"  // magenta (cor do X no logo)
bg:      "#090310"  // roxo-preto (fundo)
surface: "#120520"  // surface dos cards
text1:   "#F0EAFF"  // texto principal
```

## Deploy

Push em `dev` → preview automático no Vercel
Push em `main` → produção

```bash
npm run dev      # servidor local
npm run build    # build de produção
npm run preview  # preview do build
```
