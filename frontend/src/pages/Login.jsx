import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // REAL FIREBASE AUTHENTICATION
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("Firebase login successful:", user.email);
      console.log("Firebase UID:", user.uid);

      // Login successful
      if (role === "student") {
        navigate("/student/feedback");
      } else {
        navigate("/admin/dashboard");
      }

    } catch (error) {
      console.error("Firebase login failed:", error);

      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          Campus<span>Pulse</span> AI
        </div>

        <p className="tag">
          CAMPUS FEEDBACK INTELLIGENCE
        </p>

        <h1>Welcome back</h1>

        <p className="login-description">
          Sign in to share feedback or manage campus insights.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your college email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Login as</label>

          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">
              Student
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          {error && (
            <p
              style={{
                color: "red",
                marginTop: "10px"
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

        </form>
        <p className="register-link">
  Don't have an account?{" "}
  <button
    type="button"
    onClick={() => navigate("/register")}
    className="register-btn"
  >
    Create Account
  </button>
</p>

      </div>

    </div>
  );
}

export default Login;