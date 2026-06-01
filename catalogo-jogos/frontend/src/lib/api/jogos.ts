/**
 * Funções de acesso à API para o recurso Jogo.
 *
 * Cada função traduz uma operação do domínio em uma chamada HTTP,
 * isolando os componentes/hooks dos detalhes de endpoint e querystring.
 */

import type { Jogo, JogoInput, StatusJogo } from "@/types/jogo";

import { apiClient } from "./client";

export interface FiltrosJogos {
  busca?: string;
  status?: StatusJogo;
  plataforma?: string;
}

function montarQuerystring(filtros: FiltrosJogos): string {
  const params = new URLSearchParams();
  if (filtros.busca) params.set("busca", filtros.busca);
  if (filtros.status) params.set("status", filtros.status);
  if (filtros.plataforma) params.set("plataforma", filtros.plataforma);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export const jogosApi = {
  listar: (filtros: FiltrosJogos = {}) =>
    apiClient.get<Jogo[]>(`/jogos${montarQuerystring(filtros)}`),

  obter: (id: number) => apiClient.get<Jogo>(`/jogos/${id}`),

  criar: (dados: JogoInput) => apiClient.post<Jogo>("/jogos", dados),

  atualizar: (id: number, dados: Partial<JogoInput>) =>
    apiClient.patch<Jogo>(`/jogos/${id}`, dados),

  remover: (id: number) => apiClient.delete(`/jogos/${id}`),
};
