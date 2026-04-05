import React, { useState } from 'react';
import { useExpenseData } from '../ExpenseContext';
import { Plus, Trash2 } from 'lucide-react';

const Transactions = () => {
  const { transactions, addTransaction, deleteTransaction, incomeCategories, expenseCategories } = useExpenseData();
  
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!amount || !description) return;
    
    
    addTransaction({
      amount: parseFloat(amount),
      category: category,
      description,
      type,
      date: new Date().toISOString()
    });
    
    setAmount('');
    setDescription('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '32px' }}>
      <div>
        <h2 className="mb-4">Recent Transactions</h2>
        <div className="glass-panel" style={{ padding: '0' }}>
          {transactions.map(t => (
            <div key={t.id} className="transaction-item" style={{ padding: '20px 24px' }}>
              <div>
                <h4 style={{ marginBottom: '4px' }}>{t.description}</h4>
                 <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '12px' }}>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{t.category}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {new Date(t.date).toLocaleDateString()}
                    </span>
                 </div>
              </div>
              <div className="flex-center" style={{ gap: '16px' }}>
                <div style={{ fontWeight: '600', fontSize: '18px' }} className={t.type === 'income' ? 'income-text' : 'expense-text'}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                </div>
                <button className="btn btn-ghost" style={{ padding: '8px' }} onClick={() => deleteTransaction(t.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {transactions.length === 0 && <p style={{ padding: '24px', color: 'var(--text-secondary)', textAlign: 'center' }}>No transactions recorded.</p>}
        </div>
      </div>

      <div>
        <div className="glass-panel" style={{ position: 'sticky', top: '32px' }}>
          <h3 className="mb-4">Add Transaction</h3>
          
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '8px' }}>
              <button 
                type="button"
                className="btn"
                style={{ flex: 1, background: type === 'expense' ? 'var(--color-expense)' : 'transparent', color: type === 'expense' ? 'white' : 'var(--text-secondary)' }}
                onClick={() => setType('expense')}
              >Expense</button>
              <button 
                type="button"
                className="btn"
                style={{ flex: 1, background: type === 'income' ? 'var(--color-income)' : 'transparent', color: type === 'income' ? 'white' : 'var(--text-secondary)' }}
                onClick={() => setType('income')}
              >Income</button>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Amount (₹)</label>
              <input type="number" step="1" className="input-base" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" required />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Description</label>
              <input type="text" className="input-base" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Starbucks" required />
            </div>

            {type === 'expense' ? (
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Category</label>
                <select className="input-base" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {expenseCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Funding Source</label>
                <select className="input-base" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {incomeCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary mt-2 flex-center" style={{ width: '100%' }}>
              <Plus size={18} /> Add {type === 'expense' ? 'Expense' : 'Income'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
