import React, { useState } from 'react';
import { useExpenseData } from '../ExpenseContext';
import { Fingerprint, ArrowRight } from 'lucide-react';

const Login = () => {
  const { login } = useExpenseData();
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100vw' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
        
        <div className="flex-center mb-4" style={{ flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--color-neutral), var(--color-purple))', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 25px rgba(168, 85, 247, 0.4)' }}>
            <Fingerprint size={32} />
          </div>
          <h1 className="text-gradient">FinanceFlow</h1>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Securely log in to manage your financial portfolio and goals.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Full Name</label>
            <input 
              type="text" 
              className="input-base" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Anushka" 
              required 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Secure PIN (Optional)</label>
            <input 
              type="password" 
              className="input-base" 
              value={pin} 
              onChange={(e) => setPin(e.target.value)} 
              placeholder="••••" 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '16px' }}>
            Access Portfolio <ArrowRight size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
