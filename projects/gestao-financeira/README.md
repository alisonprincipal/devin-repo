# Finia · Gestão Financeira

Sistema de gestão financeira pessoal para controle de **despesas**, **entradas**
e **saldo mensal**. Interface futurista, responsiva, com **dark mode** e
persistência local dos dados (sem backend).

## ✨ Funcionalidades

- **Dashboard** com cartões de resumo (entradas, despesas, saldo do mês)
- **Gráficos** de evolução mensal (6 meses) e distribuição de despesas por categoria
- **Transações**: criar, editar, excluir, buscar e filtrar por tipo
- **Controle mensal**: navegação por mês no topo
- **Categorias** personalizáveis (nome, cor, ícone e tipo)
- **Dark / Light mode** com persistência da preferência
- **Import / Export** dos dados em JSON e restauração dos dados de exemplo
- Moeda **BRL (R$)** e interface em **português**

## 🧱 Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build e dev server)
- [styled-components](https://styled-components.com/) (estilização + tema)
- [Zustand](https://zustand-demo.pmnd.rs/) (estado global)
- [Recharts](https://recharts.org/) (gráficos)
- [React Router](https://reactrouter.com/) (navegação)

## 💾 Armazenamento

Os dados ficam salvos no **`localStorage`** do navegador (nosso "banco JSON").
No primeiro acesso, um conjunto de dados de exemplo (`src/data/seed.ts`) é
carregado. É possível exportar/importar tudo em JSON pela tela de Configurações.

## 🚀 Rodando localmente

Requer **Node.js 20.19+ ou 22.12+**.

```bash
cd projects/gestao-financeira
npm install
npm run dev
```

Acesse a URL exibida no terminal (por padrão `http://localhost:5173`).

### Scripts

| Comando            | Descrição                          |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Servidor de desenvolvimento        |
| `npm run build`    | Build de produção (`dist/`)        |
| `npm run preview`  | Pré-visualiza o build de produção  |
| `npm run lint`     | Lint com oxlint                    |
| `npm run typecheck`| Checagem de tipos (TypeScript)     |

## ▲ Deploy no Vercel

O projeto está pronto para o Vercel (ver `vercel.json`). Como ele vive em uma
subpasta do monorepo, ao importar o repositório no Vercel defina:

- **Root Directory**: `projects/gestao-financeira`
- Framework detectado automaticamente: **Vite**

O `vercel.json` já configura o rewrite de SPA para o roteamento client-side.

## 📁 Estrutura

```
src/
├── components/     # UI, layout, dashboard, transações, categorias
├── pages/          # Dashboard, Transações, Categorias, Configurações
├── store/          # Zustand (finanças, tema, UI)
├── lib/            # storage, formatação, seletores/cálculos
├── data/           # dados de exemplo (seed)
├── styles/         # tema, estilos globais
└── types/          # tipos compartilhados
```
