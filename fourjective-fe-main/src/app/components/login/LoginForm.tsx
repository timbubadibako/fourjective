"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(data.message);

      if (response.ok) {
        localStorage.setItem("jwtToken", data.token);
        window.location.href = "/dashboard";
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[85%] w-full flex-col gap-1 px-10 pt-10 md:w-1/2 md:justify-center md:pt-0"
    >
      <h1 className="text-4xl font-bold md:mb-2 md:text-5xl lg:text-6xl">
        Login
      </h1>
      <h2 className="mb-4 text-base md:mb-2 lg:text-2xl">
        Silahkan login dengan akun admin!
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <section className="mb-2 w-full">
        <h3 className="">Email</h3>
        <input
          className="h-10 w-full rounded-md border border-[#CBD5E1] px-3"
          id="email"
          name="email"
          type="text"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </section>
      <section className="w-full">
        <h3 className="">Password</h3>
        <input
          className="h-10 w-full rounded-md border border-[#CBD5E1] px-3"
          id="password"
          name="password"
          type="password"
          placeholder="Masukkan Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </section>
      <button className="mt-4 rounded-md bg-[#FD9A35] py-2 font-medium text-white">
        Masuk
      </button>
    </form>
  );
}
