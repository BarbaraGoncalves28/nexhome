"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterFormData,
} from "@/validations/register-schema";

import { registerUser } from "@/actions/auth/register";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),
  });

  async function onSubmit(
    data: RegisterFormData
  ) {
    setLoading(true);

    const result =
      await registerUser(data);

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(result.message);

    router.push("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Criar Conta
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Nome"
              {...register("name")}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              {...register("email")}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              {...register("password")}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirmar senha"
              {...register(
                "confirmPassword"
              )}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.confirmPassword
                    .message
                }
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 p-3 font-semibold text-white transition hover:bg-emerald-500"
          >
            {loading
              ? "Cadastrando..."
              : "Cadastrar"}
          </button>
        </form>
      </div>
    </main>
  );
}