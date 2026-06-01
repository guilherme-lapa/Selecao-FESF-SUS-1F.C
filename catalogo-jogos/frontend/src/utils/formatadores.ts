/**
 * Funções utilitárias puras (sem efeitos colaterais).
 * Facilitam testes e mantêm a lógica de apresentação fora dos componentes.
 */

/** Formata a nota (0–10) para exibição, tratando ausência de valor. */
export function formatarNota(nota: number | null): string {
  if (nota === null || nota === undefined) return "—";
  return `${nota}/10`;
}

/** Retorna uma cor de destaque conforme a faixa da nota. */
export function corDaNota(nota: number | null): string {
  if (nota === null) return "text-base-600";
  if (nota >= 8) return "text-emerald-400";
  if (nota >= 5) return "text-amber-400";
  return "text-rose-400";
}

/** Gera as iniciais de um título para uso como capa-fallback. */
export function iniciaisDoTitulo(titulo: string): string {
  return titulo
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palavra) => palavra[0]?.toUpperCase() ?? "")
    .join("");
}
