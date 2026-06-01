"""Schemas Pydantic (camada de validação e serialização).

Separam o contrato da API do modelo de persistência, permitindo
validação de entrada e controle do que é exposto na saída.
"""

from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.models.jogo import StatusJogo


class JogoBase(BaseModel):
    """Campos comuns de entrada para criação e atualização."""

    titulo: str = Field(..., min_length=1, max_length=200)
    plataforma: str = Field(..., min_length=1, max_length=100)
    genero: Optional[str] = Field(None, max_length=100)
    ano: Optional[int] = Field(None, ge=1950, le=2100)
    nota: Optional[int] = Field(None, ge=0, le=10)
    status: StatusJogo = StatusJogo.QUERO_JOGAR
    capa_url: Optional[str] = None


class JogoCreate(JogoBase):
    """Schema usado na criação de um jogo."""


class JogoUpdate(BaseModel):
    """Schema de atualização — todos os campos opcionais (PATCH parcial)."""

    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    plataforma: Optional[str] = Field(None, min_length=1, max_length=100)
    genero: Optional[str] = Field(None, max_length=100)
    ano: Optional[int] = Field(None, ge=1950, le=2100)
    nota: Optional[int] = Field(None, ge=0, le=10)
    status: Optional[StatusJogo] = None
    capa_url: Optional[str] = None


class JogoResponse(JogoBase):
    """Schema de saída — inclui o id gerado pelo banco."""

    model_config = ConfigDict(from_attributes=True)

    id: int
