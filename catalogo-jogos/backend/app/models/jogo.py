"""Modelo de dados da entidade Jogo (camada de persistência)."""

import enum

from sqlalchemy import Column, Enum, Integer, String

from app.core.database import Base


class StatusJogo(str, enum.Enum):
    """Estados possíveis de um jogo na coleção do usuário."""

    QUERO_JOGAR = "quero_jogar"
    JOGANDO = "jogando"
    ZERADO = "zerado"
    ABANDONADO = "abandonado"


class Jogo(Base):
    """Representa um jogo cadastrado no catálogo."""

    __tablename__ = "jogos"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False, index=True)
    plataforma = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    ano = Column(Integer, nullable=True)
    nota = Column(Integer, nullable=True)  # 0 a 10
    status = Column(
        Enum(StatusJogo),
        nullable=False,
        default=StatusJogo.QUERO_JOGAR,
    )
    capa_url = Column(String, nullable=True)
