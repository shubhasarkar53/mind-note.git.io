import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { useRecoilValue } from "recoil";
import { authAtom, errorAtom, loadingAtom } from "../store/atoms/atoms";
import { useAuth } from "../store/hooks/authHooks";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useRecoilValue(errorAtom);
  const loading = useRecoilValue(loadingAtom);
  const isAuthenticated = useRecoilValue(authAtom);
  const navigateTo = useNavigate();

  const { handleSignin } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic
    const isSuccess = await handleSignin({ password, username: email });
    if (isSuccess) {
      navigateTo("/dashboard");
    }
  };
  return (
    <>
      {(
        <div className="min-h-screen flex items-center justify-center bg-primary">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
            <div className="text-center">
              <Brain className="mx-auto h-12 w-12 text-accent" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-accent hover:text-blue-700">
                  Sign up
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    className="input-field mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="input-field mt-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex justify-center items-center"
                disabled={loading} // Disable button during loading
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>

              {error && (
                <div className="text-sm text-red-500 text-center mb-4">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
