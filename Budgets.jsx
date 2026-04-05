import React, { useState } from 'react';
import { useExpenseData } from '../ExpenseContext';
import { Settings2, Save } from 'lucide-react';

const Budgets = () => {
  const { budgets, updateBudget, getExpensesByCategory } = useExpenseData();
  const expenses = getExpensesByCategory();
  
  // Local state to handle form inputs before saving
  const [localBudgets, setLocalBudgets] = useState({ ...budgets });

  const handleSave = (category) => {
    updateBudget(category, parseFloat(localBudgets[category]));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h2 className="mb-1">Budget Planner</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Set monthly spending limits for your categories to unlock smart insights.</p>
      </div>
      
      <div className="dashboard-grid">
        {Object.keys(budgets).map(category => {
          const spent = expenses[category] || 0;
          const limit = budgets[category];
          const progress = Math.min((spent / limit) * 100, 100);
          const isOver = spent > limit;

          return (
            <div key={category} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div className="flex-between">
                 <h3 style={{ fontSize: '18px' }}>{category}</h3>
                 <Settings2 size={20} color="var(--text-secondary)" />
               </div>

               <div>
                 <div className="flex-between mb-1" style={{ fontSize: '14px' }}>
                   <span style={{ color: 'var(--text-secondary)' }}>Spent: <span style={{ color: isOver ? 'var(--color-expense)' : 'var(--text-primary)' }}>₹{spent.toLocaleString('en-IN')}</span></span>
                   <span style={{ color: 'var(--text-secondary)' }}>Limit: ₹{limit.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="progress-container">
                    <div className="progress-fill" style={{ width: `${progress}%`, background: isOver ? 'var(--color-expense)' : 'linear-gradient(90deg, var(--color-neutral), var(--color-purple))' }}></div>
                 </div>
               </div>

               <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                 <input 
                   type="number" 
                   className="input-base" 
                   value={localBudgets[category]}
                   onChange={(e) => setLocalBudgets({...localBudgets, [category]: e.target.value})}
                   style={{ padding: '8px 12px' }}
                 />
                 <button 
                   className="btn btn-secondary" 
                   style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)' }}
                   onClick={() => handleSave(category)}
                 >
                   <Save size={16} /> Update
                 </button>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;
