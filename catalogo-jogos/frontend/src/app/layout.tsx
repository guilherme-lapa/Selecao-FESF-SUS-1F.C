import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Catálogo de Jogos",
  description: "Sua coleção pessoal de jogos — organizada e bonita.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen font-body antialiased">
        <header className="sticky top-0 z-10 border-b border-white/5 bg-base-900/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🎮</span>
              <span className="font-display text-lg font-bold tracking-tight">
                Game<span className="text-neon">Shelf</span>
              </span>
            </Link>
            <Link
              href="/jogos/novo"
              className="rounded-lg bg-neon px-4 py-2 text-sm font-semibold text-base-900 shadow-glow transition hover:bg-neon-soft"
            >
              + Novo jogo
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t border-white/5 py-6 text-center text-xs text-white/30">
          GameShelf · Catálogo pessoal de jogos
        </footer>
      </body>
    </html>
  );
}
