import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faCarSide, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../../service/LoginService";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Optional: To handle API response or loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Animate left and right panels
    gsap.from(leftRef.current, { duration: 1, x: -100, opacity: 0, ease: "power3.out" });
    gsap.from(rightRef.current, { duration: 1, x: 100, opacity: 0, ease: "power3.out", delay: 0.3 });
  }, []);

  // Manual API call function (you call this when needed)
  const signupUser = async () => {
    try {
      setLoading(true);
      setError("");

      // Example payload
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      // await signUp(payload).then((data) => {
      //   toast.success("User signed up successfully!");
      //   // console.log("User signed up successfully:", data);
      // }).catch((error) => {
      //   console.error("Error during signup:", error);
      //   setError("Signup failed. Please try again.");
      // });

       navigate('/passenger/dashboard');
      // You will call your API here manually
      console.log("Calling API with payload:", payload);


      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)" }}
    >
      <div className="row">
        {/* Left Panel */}
        <div
          ref={leftRef}
          className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white"
        >
          <FontAwesomeIcon icon={faCarSide} size="4x" className="mb-4" />
          <h2 className="fw-bold">Vehicle Live Tracker</h2>
          <p className="text-center px-5">
            <FontAwesomeIcon icon={faLocationDot} /> &nbsp; Track your vehicles in real-time with smart and simple UI.
          </p>
        </div>

        {/* Right Panel */}
        <div
          ref={rightRef}
          className="col-md-6 d-flex align-items-center justify-content-center mt-4 my-4"
        >
          <div className="card shadow-lg p-4 w-75" style={{ borderRadius: "20px" }}>
            <h3 className="text-center mb-4 text-primary">Create Account</h3>

            {/* Username */}
            <div className="mb-3 input-group">
              <span className="input-group-text bg-white">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

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

            {/* Manual API call button */}
            <button
              className="btn btn-primary w-100"
              onClick={() => signupUser()}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {/* Optional error message */}
            {error && <p className="text-danger text-center mt-2">{error}</p>}

            {/* Footer */}
            <p className="text-center mt-3 mb-0">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
