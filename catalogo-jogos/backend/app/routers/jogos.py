"""Endpoints REST para o recurso Jogo (camada de apresentação/rotas)."""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.jogo import Jogo, StatusJogo
from app.schemas.jogo import JogoCreate, JogoResponse, JogoUpdate

router = APIRouter(prefix="/jogos", tags=["jogos"])


@router.get("", response_model=List[JogoResponse])
def listar_jogos(
    busca: Optional[str] = Query(None, description="Filtra por título"),
    status_filtro: Optional[StatusJogo] = Query(None, alias="status"),
    plataforma: Optional[str] = Query(None),
    db: Session = Depends(get_db),
) -> List[Jogo]:
    """Lista jogos com filtros opcionais de busca, status e plataforma."""
    query = db.query(Jogo)

    if busca:
        query = query.filter(Jogo.titulo.ilike(f"%{busca}%"))
    if status_filtro:
        query = query.filter(Jogo.status == status_filtro)
    if plataforma:
        query = query.filter(Jogo.plataforma.ilike(f"%{plataforma}%"))

    return query.order_by(Jogo.titulo).all()


@router.get("/{jogo_id}", response_model=JogoResponse)
def obter_jogo(jogo_id: int, db: Session = Depends(get_db)) -> Jogo:
    """Retorna um jogo específico pelo id."""
    jogo = db.query(Jogo).filter(Jogo.id == jogo_id).first()
    if jogo is None:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")
    return jogo


@router.post("", response_model=JogoResponse, status_code=status.HTTP_201_CREATED)
def criar_jogo(dados: JogoCreate, db: Session = Depends(get_db)) -> Jogo:
    """Cria um novo jogo no catálogo."""
    jogo = Jogo(**dados.model_dump())
    db.add(jogo)
    db.commit()
    db.refresh(jogo)
    return jogo


@router.patch("/{jogo_id}", response_model=JogoResponse)
def atualizar_jogo(
    jogo_id: int, dados: JogoUpdate, db: Session = Depends(get_db)
) -> Jogo:
    """Atualiza parcialmente um jogo existente."""
    jogo = db.query(Jogo).filter(Jogo.id == jogo_id).first()
    if jogo is None:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")

    for campo, valor in dados.model_dump(exclude_unset=True).items():
        setattr(jogo, campo, valor)

    db.commit()
    db.refresh(jogo)
    return jogo


@router.delete("/{jogo_id}", status_code=status.HTTP_204_NO_CONTENT)
def remover_jogo(jogo_id: int, db: Session = Depends(get_db)) -> None:
    """Remove um jogo do catálogo."""
    jogo = db.query(Jogo).filter(Jogo.id == jogo_id).first()
    if jogo is None:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")

    db.delete(jogo)
    db.commit()
