import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      background: '#f9f9f9'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to BrandGPT 🚀</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', textAlign: 'center' }}>
        Your all-in-one AI branding assistant. Autonomously generate brand identities, logos,
        social media kits, brochures, and more.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/login')} style={buttonStyle}>Login</button>
        <button onClick={() => navigate('/signup')} style={{ ...buttonStyle, marginLeft: '1rem' }}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out'
};
