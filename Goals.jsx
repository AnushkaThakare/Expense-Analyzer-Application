import React, { useState } from 'react';
import { useExpenseData } from '../ExpenseContext';
import { Target, Plus, Trash2, CheckCircle } from 'lucide-react';

const Goals = () => {
  const { goals, addGoal, updateGoalSaved, deleteGoal } = useExpenseData();
  
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState('');
  const [fundAmount, setFundAmount] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!name || !target) return;
    addGoal({
      name,
      target: parseFloat(target),
      targetDate: date ? new Date(date).toISOString() : new Date(Date.now() + 86400000 * 30).toISOString()
    });
    setName(''); setTarget(''); setDate('');
  };

  const handleFundGoal = (e, id) => {
    e.preventDefault();
    if (!fundAmount || isNaN(fundAmount)) return;
    updateGoalSaved(id, parseFloat(fundAmount));
    setFundAmount('');
    setSelectedGoal(null);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '32px' }}>
      <div>
        <h2 className="mb-4">Financial Goals</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {goals.map(goal => {
            const progress = Math.min((goal.saved / goal.target) * 100, 100);
            const isCompleted = goal.saved >= goal.target;

            return (
              <div key={goal.id} className="glass-panel" style={{ padding: '24px' }}>
                <div className="flex-between mb-2">
                  <div className="flex-center" style={{ gap: '12px' }}>
                     <div style={{ padding: '10px', borderRadius: '12px', background: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(168, 85, 247, 0.1)', color: isCompleted ? 'var(--color-income)' : 'var(--color-purple)' }}>
                       {isCompleted ? <CheckCircle size={24} /> : <Target size={24} />}
                     </div>
                     <h3 style={{ fontSize: '20px' }}>{goal.name}</h3>
                  </div>
                  <button className="btn btn-ghost" style={{ padding: '8px' }} onClick={() => deleteGoal(goal.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex-between mt-2" style={{ color: 'var(--text-secondary)' }}>
                   <span>Saved: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>₹{goal.saved.toLocaleString('en-IN')}</span> / ₹{goal.target.toLocaleString('en-IN')}</span>
                   <span>{progress.toFixed(0)}%</span>
                </div>
                
                <div className="progress-container mb-3">
                  <div className="progress-fill" style={{ width: `${progress}%`, background: isCompleted ? 'var(--color-income)' : 'linear-gradient(90deg, var(--color-neutral), var(--color-purple))' }}></div>
                </div>

                {!isCompleted && (
                  <div>
                    {selectedGoal === goal.id ? (
                      <form onSubmit={(e) => handleFundGoal(e, goal.id)} style={{ display: 'flex', gap: '12px' }}>
                        <input type="number" className="input-base" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} placeholder="Amount to add (₹)" required />
                        <button type="submit" className="btn btn-primary">Fund</button>
                        <button type="button" className="btn btn-ghost" onClick={() => setSelectedGoal(null)}>Cancel</button>
                      </form>
                    ) : (
                      <button className="btn btn-secondary" style={{ border: '1px solid var(--border-subtle)' }} onClick={() => setSelectedGoal(goal.id)}>
                        + Add Funds
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          
          {goals.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>No financial goals active. Set one up to start saving!</p>}
        </div>
      </div>

      <div>
        <div className="glass-panel" style={{ position: 'sticky', top: '32px' }}>
          <h3 className="mb-4">Create New Goal</h3>
          <form onSubmit={handleAddGoal} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Goal Name</label>
              <input type="text" className="input-base" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Vacation to Bali" required />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Target Amount (₹)</label>
              <input type="number" step="1" className="input-base" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="0" required />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Target Date (Optional)</label>
              <input type="date" className="input-base" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }}>
              <Plus size={18} /> Add Goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Goals;
