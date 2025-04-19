'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok && res.status === 201) {
        router.push(`/`);
      } else {
        console.error("Signup failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-forth text-second px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 p-6 bg-first rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-third">Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-second bg-first text-second placeholder:text-second focus:outline-none focus:border-third"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-second bg-first text-second placeholder:text-second focus:outline-none focus:border-third"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-third text-first py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? 'Please wait...' : 'Register'}
        </button>
      </form>

      
    </div>
  );
};

export default AuthForm;
