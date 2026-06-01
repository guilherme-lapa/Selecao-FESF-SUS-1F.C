import Link from "next/link";

import { StatusBadge } from "@/components/ui/Feedback";
import type { Jogo } from "@/types/jogo";
import {
  corDaNota,
  formatarNota,
  iniciaisDoTitulo,
} from "@/utils/formatadores";

/** Cartão que resume um jogo na listagem. Linka para o detalhe. */
export function JogoCard({ jogo }: { jogo: Jogo }) {
  return (
    <Link
      href={`/jogos/${jogo.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-base-800 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-neon/30 hover:shadow-glow"
    >
      {/* Capa (imagem ou fallback com iniciais) */}
      <div className="relative aspect-[3/4] overflow-hidden bg-base-700">
        {jogo.capa_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={jogo.capa_url}
            alt={`Capa de ${jogo.titulo}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-base-600 to-base-800">
            <span className="font-display text-4xl font-bold text-white/20">
              {iniciaisDoTitulo(jogo.titulo)}
            </span>
          </div>
        )}
        <div className="absolute right-2 top-2">
          <StatusBadge status={jogo.status} />
        </div>
      </div>

      {/* Metadados */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 font-display text-sm font-semibold text-white">
          {jogo.titulo}
        </h3>
        <p className="text-xs text-white/40">{jogo.plataforma}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-white/30">{jogo.ano ?? "—"}</span>
          <span className={`text-sm font-semibold ${corDaNota(jogo.nota)}`}>
            {formatarNota(jogo.nota)}
          </span>
        </div>
      </div>
    </Link>
  );
}
