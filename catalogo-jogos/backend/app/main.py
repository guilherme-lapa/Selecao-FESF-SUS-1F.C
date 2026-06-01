"""Ponto de entrada da aplicação FastAPI.

Configura CORS para permitir o consumo pelo front-end Next.js,
cria as tabelas e registra os routers.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, SessionLocal, engine
from app.models.jogo import Jogo, StatusJogo
from app.routers import jogos

# Cria as tabelas no banco (idempotente)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Catálogo de Jogos API",
    description="API REST para gerenciar uma coleção pessoal de jogos.",
    version="1.0.0",
)

# CORS — libera o front-end local (Next.js roda na porta 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jogos.router)


@app.get("/", tags=["health"])
def health_check() -> dict:
    """Endpoint simples para verificar se a API está no ar."""
    return {"status": "ok", "servico": "Catálogo de Jogos API"}


def _seed_inicial() -> None:
    """Popula o banco com alguns jogos de exemplo, se estiver vazio."""
    db = SessionLocal()
    try:
        if db.query(Jogo).count() == 0:
            exemplos = [
                Jogo(
                    titulo="The Legend of Zelda: Breath of the Wild",
                    plataforma="Nintendo Switch",
                    genero="Aventura",
                    ano=2017,
                    nota=10,
                    status=StatusJogo.ZERADO,
                ),
                Jogo(
                    titulo="Elden Ring",
                    plataforma="PC",
                    genero="RPG de Ação",
                    ano=2022,
                    nota=9,
                    status=StatusJogo.JOGANDO,
                ),
                Jogo(
                    titulo="Hollow Knight",
                    plataforma="PC",
                    genero="Metroidvania",
                    ano=2017,
                    nota=9,
                    status=StatusJogo.QUERO_JOGAR,
                ),
            ]
            db.add_all(exemplos)
            db.commit()
    finally:
        db.close()


_seed_inicial()
