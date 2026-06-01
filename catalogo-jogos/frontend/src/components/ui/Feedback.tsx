import type { StatusJogo } from "@/types/jogo";
import { STATUS_META } from "@/types/jogo";

/** Selo colorido que representa o status de um jogo. */
export function StatusBadge({ status }: { status: StatusJogo }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.cor}`}
    >
      {meta.rotulo}
    </span>
  );
}

/** Indicador de carregamento centralizado. */
export function Spinner({ texto = "Carregando…" }: { texto?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-white/50">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-neon" />
      <p className="text-sm">{texto}</p>
    </div>
  );
}

/** Mensagem de estado vazio. */
export function EstadoVazio({ mensagem }: { mensagem: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 py-16 text-center text-white/40">
      {mensagem}
    </div>
  );
}

/** Mensagem de erro com ação opcional de retry. */
export function EstadoErro({
  mensagem,
  aoTentarNovamente,
}: {
  mensagem: string;
  aoTentarNovamente?: () => void;
}) {
  return (
    <div className="rounded-xl border border-accent/30 bg-accent/10 py-12 text-center">
      <p className="text-accent-soft">{mensagem}</p>
      {aoTentarNovamente && (
        <button
          onClick={aoTentarNovamente}
          className="mt-3 text-sm text-white/60 underline hover:text-white"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
