# 🎮 GameShelf — Catálogo de Jogos

Aplicação **fullstack** para gerenciar uma coleção pessoal de jogos.
Desenvolvida como projeto de portfólio para a seleção **FESF-SUS – 1 F.C.**

- **Back-end:** API REST em **Python** com **FastAPI**
- **Front-end:** **React** com **Next.js** (App Router), **TypeScript** e **Tailwind CSS**

O front-end consome a API desenvolvida no back-end, cobrindo um fluxo
completo de **CRUD** (criar, listar, buscar, filtrar, editar e remover jogos).

---

## ✨ Funcionalidades

- Listagem de jogos em grade, com capas e selos de status
- Busca por título e filtros por status e plataforma
- Cadastro, edição e remoção de jogos (CRUD completo)
- Status de progresso: *Quero jogar*, *Jogando*, *Zerado*, *Abandonado*
- Tratamento de estados de carregamento, erro e lista vazia
- Validação de formulário no front e no back-end

---

## 🗂️ Estrutura do projeto

```
catalogo-jogos/
├── backend/                 # API FastAPI
│   └── app/
│       ├── core/            # Configuração de banco de dados
│       ├── models/          # Modelos SQLAlchemy (persistência)
│       ├── schemas/         # Schemas Pydantic (validação/serialização)
│       ├── routers/         # Endpoints REST
│       └── main.py          # Aplicação e configuração de CORS
└── frontend/                # Aplicação Next.js
    └── src/
        ├── app/             # Rotas (App Router)
        ├── components/
        │   ├── ui/          # Componentes reutilizáveis (Button, Input…)
        │   └── features/    # Componentes de domínio (JogoCard, JogoForm…)
        ├── hooks/           # Custom hooks (useJogos)
        ├── lib/api/         # Camada de comunicação com a API
        ├── types/           # Tipos do domínio
        └── utils/           # Funções utilitárias puras
```

A organização segue **separação de responsabilidades**: os componentes de UI
não acessam a API diretamente — eles usam *hooks*, que usam a camada `lib/api`,
que por sua vez usa um cliente HTTP centralizado.

---

## 🚀 Como executar

> Pré-requisitos: **Python 3.10+** e **Node.js 18+**.

### 1. Back-end (API FastAPI)

```bash
cd backend

# (opcional, recomendado) ambiente virtual
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

A API ficará disponível em **http://localhost:8000**.
Documentação interativa (Swagger) em **http://localhost:8000/docs**.

> Na primeira execução o banco SQLite é criado automaticamente e populado
> com alguns jogos de exemplo.

### 2. Front-end (Next.js)

Em **outro terminal**:

```bash
cd frontend

npm install

# configura a URL da API
cp .env.example .env.local

npm run dev
```

O front-end ficará disponível em **http://localhost:3000**.

---

## 🔌 Endpoints da API

| Método   | Rota              | Descrição                          |
| -------- | ----------------- | ---------------------------------- |
| `GET`    | `/jogos`          | Lista jogos (aceita filtros)       |
| `GET`    | `/jogos/{id}`     | Detalha um jogo                    |
| `POST`   | `/jogos`          | Cria um jogo                       |
| `PATCH`  | `/jogos/{id}`     | Atualiza parcialmente um jogo      |
| `DELETE` | `/jogos/{id}`     | Remove um jogo                     |

Filtros de listagem (querystring): `busca`, `status`, `plataforma`.

---

## 🛠️ Tecnologias

| Camada    | Stack                                                |
| --------- | ---------------------------------------------------- |
| Back-end  | Python, FastAPI, SQLAlchemy, Pydantic, SQLite        |
| Front-end | React, Next.js (App Router), TypeScript, Tailwind CSS |

---

## 📋 Decisões de projeto

- **SQLite** foi escolhido para que o projeto rode sem configuração externa de
  banco de dados, facilitando a avaliação.
- **Schemas Pydantic** separados dos **modelos SQLAlchemy** isolam o contrato
  público da API da estrutura de persistência.
- No front-end, a **camada `lib/api`** centraliza toda comunicação HTTP,
  mantendo os componentes declarativos e fáceis de testar.
- **TypeScript** em modo `strict` garante segurança de tipos de ponta a ponta.
