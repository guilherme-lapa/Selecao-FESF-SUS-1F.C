"use client";

import { useState } from "react";

import { BarraFiltros } from "@/components/features/BarraFiltros";
import { JogoCard } from "@/components/features/JogoCard";
import {
  EstadoErro,
  EstadoVazio,
  Spinner,
} from "@/components/ui/Feedback";
import { useJogos } from "@/hooks/useJogos";
import type { FiltrosJogos } from "@/lib/api/jogos";

export default function HomePage() {
  const [filtros, setFiltros] = useState<FiltrosJogos>({});
  const { jogos, carregando, erro, recarregar } = useJogos(filtros);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Sua coleção
        </h1>
        <p className="mt-1 text-white/50">
          {jogos.length} {jogos.length === 1 ? "jogo" : "jogos"} no catálogo
        </p>
      </section>

      <BarraFiltros filtros={filtros} aoMudar={setFiltros} />

      {carregando && <Spinner />}

      {!carregando && erro && (
        <EstadoErro mensagem={erro} aoTentarNovamente={recarregar} />
      )}

      {!carregando && !erro && jogos.length === 0 && (
        <EstadoVazio mensagem="Nenhum jogo encontrado. Que tal adicionar o primeiro?" />
      )}

      {!carregando && !erro && jogos.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {jogos.map((jogo, indice) => (
            <div
              key={jogo.id}
              className="animar-surgir"
              style={{ animationDelay: `${indice * 40}ms` }}
            >
              <JogoCard jogo={jogo} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
