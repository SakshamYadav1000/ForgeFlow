import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  login,
  register,
} from "../../services/authService";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({
  mode,
}: AuthFormProps) {
  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const response = await login({
          email,
          password,
        });

        localStorage.setItem(
          "token",
          response.access_token
        );

        navigate("/dashboard");
      } else {
        await register({
          full_name: fullName,
          email,
          password,
        });

        alert(
          "Account created successfully."
        );

        navigate("/login");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail ??
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-3xl font-bold">
        ForgeFlow
      </h1>

      <p className="mb-6 text-center text-gray-500">
        {mode === "login"
          ? "Login to your account"
          : "Create your account"}
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {mode === "register" && (
          <div>
            <label className="mb-1 block">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
              className="w-full rounded border p-3"
              required
            />
          </div>
        )}

        <div>
          <label className="mb-1 block">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-1 block">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full rounded border p-3"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}