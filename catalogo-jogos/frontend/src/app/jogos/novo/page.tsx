"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { JogoForm } from "@/components/features/JogoForm";
import { jogosApi } from "@/lib/api/jogos";
import type { JogoInput } from "@/types/jogo";

export default function NovoJogoPage() {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function criar(dados: JogoInput) {
    setEnviando(true);
    setErro(null);
    try {
      const jogo = await jogosApi.criar(dados);
      router.push(`/jogos/${jogo.id}`);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao criar jogo.");
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/" className="text-sm text-white/50 hover:text-white">
        ← Voltar
      </Link>
      <h1 className="mb-6 mt-2 font-display text-2xl font-bold">
        Adicionar jogo
      </h1>
      <JogoForm
        textoBotao="Adicionar à coleção"
        enviando={enviando}
        erro={erro}
        aoEnviar={criar}
      />
    </div>
  );
}
