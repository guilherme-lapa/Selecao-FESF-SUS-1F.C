/**
 * Tipos do domínio — espelham o contrato da API FastAPI.
 * Fonte única da verdade para o formato dos dados no front-end.
 */

export type StatusJogo = "quero_jogar" | "jogando" | "zerado" | "abandonado";

export interface Jogo {
  id: number;
  titulo: string;
  plataforma: string;
  genero: string | null;
  ano: number | null;
  nota: number | null;
  status: StatusJogo;
  capa_url: string | null;
}

/** Dados enviados na criação/edição (sem o id, gerado pelo backend). */
export type JogoInput = Omit<Jogo, "id">;

/** Metadados de exibição de cada status (rótulo + cor). */
export const STATUS_META: Record<
  StatusJogo,
  { rotulo: string; cor: string }
> = {
  quero_jogar: { rotulo: "Quero jogar", cor: "bg-sky-500/20 text-sky-300" },
  jogando: { rotulo: "Jogando", cor: "bg-amber-500/20 text-amber-300" },
  zerado: { rotulo: "Zerado", cor: "bg-emerald-500/20 text-emerald-300" },
  abandonado: { rotulo: "Abandonado", cor: "bg-rose-500/20 text-rose-300" },
};
