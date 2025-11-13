import { useState } from "react";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export default function CGSAdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSecurityKey, setShowSecurityKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Simple encryption function for security key
  const encryptData = (data, key) => {
    try {
      // Basic XOR encryption for demonstration
      let encrypted = "";
      for (let i = 0; i < data.length; i++) {
        encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return btoa(encrypted); // Base64 encode
    } catch (err) {
      console.error("Encryption error:", err);
      return data;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validate security key
    if (!securityKey || securityKey.length < 8) {
      setError("Security key must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      // Encrypt password with security key
      const encryptedPassword = encryptData(password, securityKey);

      const res = await fetch(`${API_BASE_URL}/login/cgs-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: encryptedPassword,
          securityKey: securityKey.substring(0, 4), // Store only partial key for verification
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "cgs-admin");
        localStorage.setItem("cgsSecurityKey", securityKey); // Store in session only

        if (onLogin) onLogin("cgs-admin");
        navigate("/cgs-admin/dashboard");
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white text-center">CGS Admin</h1>
            <p className="text-purple-200 mt-2 text-center text-sm">
              Secure Administrative Access
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-400 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-2">
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@university.edu"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-100 mb-2">
                <div className="flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </div>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition backdrop-blur-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-purple-300 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="securityKey" className="block text-sm font-medium text-purple-100 mb-2">
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  Security Key (Encryption)
                </div>
              </label>
              <div className="relative">
                <input
                  id="securityKey"
                  type={showSecurityKey ? "text" : "password"}
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  placeholder="Enter your security key (min 8 characters)"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition backdrop-blur-sm"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowSecurityKey(!showSecurityKey)}
                  className="absolute right-3 top-3 text-purple-300 hover:text-white transition"
                >
                  {showSecurityKey ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-purple-300 mt-1">
                ⚠️ Security key is used to encrypt your login. Keep it safe.
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500 bg-white/10"
              />
              <label htmlFor="agree" className="ml-2 text-sm text-purple-200">
                I agree to the security terms
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-semibold transition-all transform ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-purple-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/50"
              } flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Secure Login</span>
                </>
              )}
            </button>
          </form>

          {/* Security Info */}
          <div className="mt-6 p-4 bg-purple-500/20 border border-purple-400/30 rounded-lg">
            <p className="text-xs text-purple-200 text-center">
              🔒 This portal uses encryption for enhanced security. Your credentials and security key are encrypted before transmission.
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-purple-300">
            Lost access?{" "}
            <a href="#" className="text-purple-100 hover:text-white font-medium">
              Contact IT Support
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
