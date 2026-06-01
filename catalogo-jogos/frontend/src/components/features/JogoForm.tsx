"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Campo";
import { STATUS_META, type JogoInput, type StatusJogo } from "@/types/jogo";

interface JogoFormProps {
  valorInicial?: Partial<JogoInput>;
  textoBotao: string;
  enviando: boolean;
  erro: string | null;
  aoEnviar: (dados: JogoInput) => void;
}

const VALOR_PADRAO: JogoInput = {
  titulo: "",
  plataforma: "",
  genero: null,
  ano: null,
  nota: null,
  status: "quero_jogar",
  capa_url: null,
};

/**
 * Formulário controlado de jogo, reaproveitado em criar e editar.
 * Faz validação básica antes de delegar o envio ao componente pai.
 */
export function JogoForm({
  valorInicial,
  textoBotao,
  enviando,
  erro,
  aoEnviar,
}: JogoFormProps) {
  const [form, setForm] = useState<JogoInput>({
    ...VALOR_PADRAO,
    ...valorInicial,
  });
  const [erroValidacao, setErroValidacao] = useState<string | null>(null);

  function atualizar<K extends keyof JogoInput>(campo: K, valor: JogoInput[K]) {
    setForm((anterior) => ({ ...anterior, [campo]: valor }));
  }

  function submeter() {
    if (!form.titulo.trim() || !form.plataforma.trim()) {
      setErroValidacao("Título e plataforma são obrigatórios.");
      return;
    }
    setErroValidacao(null);
    aoEnviar(form);
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        id="titulo"
        rotulo="Título *"
        value={form.titulo}
        onChange={(e) => atualizar("titulo", e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="plataforma"
          rotulo="Plataforma *"
          value={form.plataforma}
          onChange={(e) => atualizar("plataforma", e.target.value)}
        />
        <Input
          id="genero"
          rotulo="Gênero"
          value={form.genero ?? ""}
          onChange={(e) => atualizar("genero", e.target.value || null)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          id="ano"
          rotulo="Ano"
          type="number"
          value={form.ano ?? ""}
          onChange={(e) =>
            atualizar("ano", e.target.value ? Number(e.target.value) : null)
          }
        />
        <Input
          id="nota"
          rotulo="Nota (0–10)"
          type="number"
          min={0}
          max={10}
          value={form.nota ?? ""}
          onChange={(e) =>
            atualizar("nota", e.target.value ? Number(e.target.value) : null)
          }
        />
        <Select
          id="status"
          rotulo="Status"
          value={form.status}
          onChange={(e) => atualizar("status", e.target.value as StatusJogo)}
        >
          {Object.entries(STATUS_META).map(([valor, meta]) => (
            <option key={valor} value={valor}>
              {meta.rotulo}
            </option>
          ))}
        </Select>
      </div>

      <Input
        id="capa_url"
        rotulo="URL da capa"
        placeholder="https://…"
        value={form.capa_url ?? ""}
        onChange={(e) => atualizar("capa_url", e.target.value || null)}
      />

      {(erroValidacao || erro) && (
        <p className="text-sm text-accent-soft">{erroValidacao || erro}</p>
      )}

      <Button onClick={submeter} disabled={enviando} className="mt-2 self-start">
        {enviando ? "Salvando…" : textoBotao}
      </Button>
    </div>
  );
}
