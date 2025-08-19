import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // 🚀 Directly navigate to dashboard, skipping login
    navigate("/dashboard");
  };

  return (
    <div className="home-container">
      <header className="hero">
        <div className="hero-content">
          <h1>
            Welcome to <span>PulseArchive</span>
          </h1>
          <p>Securely manage your health records, anytime and anywhere.</p>

          {/* ✅ Button that directly navigates */}
          <button onClick={handleGetStarted} className="btn">
            Get Started
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose PulseArchive?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3> Secure</h3>
            <p>Your health data is encrypted and protected with top-level security.</p>
          </div>
          <div className="feature-card">
            <h3> Accessible</h3>
            <p>Access your medical records from any device, at any time.</p>
          </div>
          <div className="feature-card">
            <h3> Fast</h3>
            <p>Instantly upload, retrieve, and share your records with doctors.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
