"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { StatusBadge, EstadoErro, Spinner } from "@/components/ui/Feedback";
import { jogosApi } from "@/lib/api/jogos";
import type { Jogo } from "@/types/jogo";
import { corDaNota, formatarNota, iniciaisDoTitulo } from "@/utils/formatadores";

export default function DetalheJogoPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [jogo, setJogo] = useState<Jogo | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [removendo, setRemovendo] = useState(false);

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

  async function remover() {
    if (!confirm("Remover este jogo da coleção?")) return;
    setRemovendo(true);
    try {
      await jogosApi.remover(id);
      router.push("/");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao remover.");
      setRemovendo(false);
    }
  }

  if (carregando) return <Spinner />;
  if (erro) return <EstadoErro mensagem={erro} />;
  if (!jogo) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/" className="text-sm text-white/50 hover:text-white">
        ← Voltar para a coleção
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-[240px_1fr]">
        {/* Capa */}
        <div className="aspect-[3/4] overflow-hidden rounded-xl border border-white/5 bg-base-700 shadow-card">
          {jogo.capa_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={jogo.capa_url}
              alt={`Capa de ${jogo.titulo}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-base-600 to-base-800">
              <span className="font-display text-5xl font-bold text-white/20">
                {iniciaisDoTitulo(jogo.titulo)}
              </span>
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <StatusBadge status={jogo.status} />
            <h1 className="font-display text-3xl font-extrabold leading-tight">
              {jogo.titulo}
            </h1>
          </div>

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Campo rotulo="Plataforma" valor={jogo.plataforma} />
            <Campo rotulo="Gênero" valor={jogo.genero ?? "—"} />
            <Campo rotulo="Ano" valor={String(jogo.ano ?? "—")} />
            <div>
              <dt className="text-white/40">Nota</dt>
              <dd className={`text-lg font-bold ${corDaNota(jogo.nota)}`}>
                {formatarNota(jogo.nota)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex gap-3">
            <Link href={`/jogos/${jogo.id}/editar`}>
              <Button variante="secundario">Editar</Button>
            </Link>
            <Button variante="perigo" onClick={remover} disabled={removendo}>
              {removendo ? "Removendo…" : "Remover"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Campo({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <dt className="text-white/40">{rotulo}</dt>
      <dd className="text-white">{valor}</dd>
    </div>
  );
}
