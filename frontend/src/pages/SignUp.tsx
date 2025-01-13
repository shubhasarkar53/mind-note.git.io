import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignup({
    name,
    password,
    username,
  }: {
    name: string;
    password: string;
    username: string;
  }) {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/signup`,
        { fullname:name, password, username },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic
    handleSignup({ name, password, username });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Brain className="mx-auto h-12 w-12 text-accent" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-accent hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="input-field mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username 
              </label>
              <input
                id="username"
                type="username"
                required
                className="input-field mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

          <button type="submit" className="btn-primary w-full">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
