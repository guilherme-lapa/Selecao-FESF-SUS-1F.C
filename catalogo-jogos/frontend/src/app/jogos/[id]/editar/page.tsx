"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { JogoForm } from "@/components/features/JogoForm";
import { EstadoErro, Spinner } from "@/components/ui/Feedback";
import { jogosApi } from "@/lib/api/jogos";
import type { Jogo, JogoInput } from "@/types/jogo";

export default function EditarJogoPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [jogo, setJogo] = useState<Jogo | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    jogosApi
      .obter(id)
      .then((dados) => ativo && setJogo(dados))
      .catch((e) => ativo && setErro(e.message))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, [id]);

  async function salvar(dados: JogoInput) {
    setEnviando(true);
    setErro(null);
    try {
      await jogosApi.atualizar(id, dados);
      router.push(`/jogos/${id}`);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao salvar.");
      setEnviando(false);
    }
  }

  if (carregando) return <Spinner />;
  if (erro && !jogo) return <EstadoErro mensagem={erro} />;
  if (!jogo) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/jogos/${id}`}
        className="text-sm text-white/50 hover:text-white"
      >
        ← Voltar
      </Link>
      <h1 className="mb-6 mt-2 font-display text-2xl font-bold">
        Editar jogo
      </h1>
      <JogoForm
        valorInicial={jogo}
        textoBotao="Salvar alterações"
        enviando={enviando}
        erro={erro}
        aoEnviar={salvar}
      />
    </div>
  );
}
