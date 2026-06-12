"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  FiMail,
  FiLock,
  FiUser,
  FiHome,
} from "react-icons/fi";

import { loginUser } from "@/actions/auth/login";
import { registerUser } from "@/actions/auth/register";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await loginUser({ email, password });

        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success("Bem-vindo ao NexHome!");
        router.push("/");
      } else {
        const res = await registerUser({ name, email, password, confirmPassword, });

        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success("Conta criada com sucesso!");
        setMode("login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">

        {/* BRAND */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
          <div className="flex items-center gap-2 text-cyan-300">
            <FiHome />
            <span className="font-bold">NexHome</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Plataforma imobiliária
            <br />
            premium
          </h1>

          <p className="mt-4 text-slate-300">
            Conectando clientes, corretores e imóveis em um único ecossistema.
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-10">

          <h2 className="text-2xl font-bold">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {mode === "register" && (
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="w-full pl-10 p-3 border rounded-lg"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                className="w-full pl-10 p-3 border rounded-lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                className="w-full pl-10 p-3 border rounded-lg"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {mode === "register" && (
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-10 p-3 border rounded-lg"
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-slate-950 text-white p-3 rounded-lg"
            >
              {loading ? "Processando..." : mode === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            {mode === "login" ? "Não tem conta?" : "Já tem conta?"}

            <button
              onClick={() =>
                setMode(mode === "login" ? "register" : "login")
              }
              className="ml-2 text-cyan-600 font-semibold"
            >
              {mode === "login" ? "Criar" : "Entrar"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}