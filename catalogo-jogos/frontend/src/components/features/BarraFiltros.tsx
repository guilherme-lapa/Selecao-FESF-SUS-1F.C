"use client";

import { Input, Select } from "@/components/ui/Campo";
import type { FiltrosJogos } from "@/lib/api/jogos";
import { STATUS_META, type StatusJogo } from "@/types/jogo";

interface BarraFiltrosProps {
  filtros: FiltrosJogos;
  aoMudar: (filtros: FiltrosJogos) => void;
}

/** Controles de busca e filtragem da listagem de jogos. */
export function BarraFiltros({ filtros, aoMudar }: BarraFiltrosProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto]">
      <Input
        id="busca"
        placeholder="Buscar por título…"
        value={filtros.busca ?? ""}
        onChange={(e) => aoMudar({ ...filtros, busca: e.target.value })}
      />

      <Select
        id="status"
        value={filtros.status ?? ""}
        onChange={(e) =>
          aoMudar({
            ...filtros,
            status: (e.target.value || undefined) as StatusJogo | undefined,
          })
        }
      >
        <option value="">Todos os status</option>
        {Object.entries(STATUS_META).map(([valor, meta]) => (
          <option key={valor} value={valor}>
            {meta.rotulo}
          </option>
        ))}
      </Select>

      <Input
        id="plataforma"
        placeholder="Plataforma…"
        value={filtros.plataforma ?? ""}
        onChange={(e) => aoMudar({ ...filtros, plataforma: e.target.value })}
      />
    </div>
  );
}
