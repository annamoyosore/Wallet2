
import React from "react";
import "./App.css";

function App() {

  const handleSubmit = (event) => {
    event.preventDefault();

    // No application details are stored or transmitted.
    window.location.href = "/check.html";
  };

  return (
    <div className="nersi-app">

      <header className="header">
        <div className="logo">
          Nersi <span>Relief</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#application">Apply</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <h1>Welcome to Nersi Relief</h1>

        <p>
          Explore community assistance and available
          support opportunities.
        </p>

        <a href="#application" className="hero-btn">
          Apply for Assistance
        </a>
      </section>

      <main className="container">

        <section className="box about" id="about">
          <h2>About Nersi Relief</h2>

          <p>
            Nersi Relief is a proposed community assistance
            initiative designed to provide information about
            support opportunities for individuals and families.
          </p>

          <p>
            Our goal is to make assistance information accessible
            and provide a simple application process for people
            seeking support.
          </p>
        </section>

        <section className="box" id="application">

          <h2>Relief Application</h2>

          <p className="subtitle">
            Please provide the requested information below.
          </p>

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              required
            />

            <label>Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter your country"
              required
            />

            <label>State / Region</label>
            <input
              type="text"
              name="state"
              placeholder="Enter your state"
              required
            />

            <label>Assistance Category</label>
            <select name="assistance" required>
              <option value="">Select category</option>
              <option>Financial Assistance</option>
              <option>Food Assistance</option>
              <option>Educational Support</option>
              <option>Medical Support</option>
              <option>Other Support</option>
            </select>

            <label>Amount Requested (Optional)</label>
            <input
              type="number"
              name="amount"
              min="0"
              placeholder="Enter amount"
            />

            <label>Reason for Application</label>
            <textarea
              name="reason"
              placeholder="Explain your request"
              required
            />

            <button type="submit" className="submit-btn">
              Continue to Application Information
            </button>

          </form>

          <p className="notice">
            This is a demonstration application form.
            No personal information is stored or submitted.
          </p>

        </section>

      </main>

      <footer>
        © 2026 Nersi Relief. All Rights Reserved.
      </footer>

    </div>
  );
}

export default App;
