import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Optional: To handle API response or loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    gsap.from(cardRef.current, { duration: 1, y: -50, opacity: 0, ease: "power3.out" });
  }, []);

  // Manual API call function
  const signinUser = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        email: formData.email,
        password: formData.password,
      };

      // Example: console log payload for manual API call
      console.log("Calling API with payload:", payload);
 navigate('/passenger/dashboard');
      // Uncomment and use your API call manually
      /*
      const response = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("API response:", data);
      */

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center p-4"
      style={{ background: "linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)",}}
    >
      <div ref={cardRef} className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "20px" }}>
        <h3 className="text-center mb-4 text-primary">Sign In</h3>

        {/* Email */}
        <div className="mb-3 input-group">
          <span className="input-group-text bg-white">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="mb-3 input-group">
          <span className="input-group-text bg-white">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        {/* Signin Button */}
        <button
          className="btn btn-primary w-100"
          onClick={() => signinUser()}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Error message */}
        {error && <p className="text-danger text-center mt-2">{error}</p>}

        {/* Footer */}
        <p className="text-center mt-3 mb-0">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
