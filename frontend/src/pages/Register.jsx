import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(
        "Firebase account created:",
        userCredential.user.email
      );

      console.log(
        "Firebase UID:",
        userCredential.user.uid
      );

      // After registration → Login page
      navigate("/login");

    } catch (error) {
      console.error("Registration failed:", error);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak.");
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

        <h1>Create account</h1>

        <p className="login-description">
          Create your CampusPulse account to continue.
        </p>

        <form onSubmit={handleRegister}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <label>Register as</label>

          <select
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
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>

        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Register;