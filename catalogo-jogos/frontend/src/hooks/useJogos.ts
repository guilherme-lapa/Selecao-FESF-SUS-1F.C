"use client";

/**
 * Hook que encapsula o estado da listagem de jogos.
 *
 * Concentra loading, erro, dados e filtros num único lugar, deixando
 * os componentes de UI declarativos e livres de lógica de requisição.
 */

import { useCallback, useEffect, useState } from "react";

import { type FiltrosJogos, jogosApi } from "@/lib/api/jogos";
import type { Jogo } from "@/types/jogo";

interface EstadoJogos {
  jogos: Jogo[];
  carregando: boolean;
  erro: string | null;
}

export function useJogos(filtros: FiltrosJogos) {
  const [estado, setEstado] = useState<EstadoJogos>({
    jogos: [],
    carregando: true,
    erro: null,
  });

  const carregar = useCallback(async () => {
    setEstado((anterior) => ({ ...anterior, carregando: true, erro: null }));
    try {
      const jogos = await jogosApi.listar(filtros);
      setEstado({ jogos, carregando: false, erro: null });
    } catch (e) {
      const mensagem =
        e instanceof Error ? e.message : "Falha ao carregar jogos.";
      setEstado({ jogos: [], carregando: false, erro: mensagem });
    }
    // Dependemos dos valores primitivos dos filtros (e não do objeto `filtros`)
    // para evitar recriar a função quando a referência muda sem mudança real
    // de conteúdo, o que dispararia requisições desnecessárias.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros.busca, filtros.status, filtros.plataforma]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { ...estado, recarregar: carregar };
}
