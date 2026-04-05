import React from 'react';
import { useExpenseData } from '../ExpenseContext';
import { TrendingUp, TrendingDown, IndianRupee, Lightbulb } from 'lucide-react';

const Dashboard = () => {
  const { calculateTotals, generateInsights, transactions, user } = useExpenseData();
  const { income, expenses, balance } = calculateTotals();
  const insights = generateInsights();

  // Get last 5 transactions for quick view
  const recentTransactions = [...transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h1 className="mb-1" style={{ fontSize: '32px' }}>Welcome back, {user?.name || 'User'} 👋</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Here is your financial portfolio overview.</p>
      </div>

      {/* Hero Stats */}
      <div className="dashboard-grid mb-4">
        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--color-neutral)', filter: 'blur(50px)', opacity: 0.2 }}></div>
          <div className="flex-between mb-2">
            <h4 style={{ color: 'var(--text-secondary)' }}>Total Balance</h4>
            <IndianRupee color="var(--color-neutral)" size={20} />
          </div>
          <div style={{ fontSize: '42px', fontWeight: '700', color: balance >= 0 ? 'var(--text-primary)' : 'var(--color-expense)' }}>
            ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="glass-panel">
          <div className="flex-between mb-2">
            <h4 style={{ color: 'var(--text-secondary)' }}>Monthly Income</h4>
            <TrendingUp color="var(--color-income)" size={20} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>
            ₹{income.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="glass-panel">
          <div className="flex-between mb-2">
            <h4 style={{ color: 'var(--text-secondary)' }}>Monthly Expenses</h4>
            <TrendingDown color="var(--color-expense)" size={20} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>
            ₹{expenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
        {/* Recent Transactions List */}
        <div className="glass-panel">
           <h3 className="mb-3">Recent Transactions</h3>
           <div>
             {recentTransactions.map(t => (
               <div key={t.id} className="transaction-item">
                 <div>
                   <h4 style={{ marginBottom: '4px' }}>{t.description}</h4>
                   <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{t.category}</span>
                 </div>
                 <div style={{ fontWeight: '600', fontSize: '18px' }} className={t.type === 'income' ? 'income-text' : 'expense-text'}>
                   {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                 </div>
               </div>
             ))}
             {recentTransactions.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No transactions yet.</p>}
           </div>
        </div>

        {/* Actionable Insights Panel */}
        <div className="glass-panel">
          <h3 className="mb-3 flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
            <Lightbulb color="var(--color-warning)" size={20} /> Smart Insights
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {insights.slice(0, 3).map((insight, idx) => (
              <div key={idx} style={{ 
                padding: '16px', 
                borderRadius: '12px', 
                background: insight.type === 'warning' ? 'rgba(239, 68, 68, 0.1)' : insight.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(56, 189, 248, 0.1)',
                border: `1px solid ${insight.type === 'warning' ? 'rgba(239, 68, 68, 0.2)' : insight.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.2)'}`
              }}>
                <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
