import React from 'react';
import { useExpenseData } from '../ExpenseContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Analytics = () => {
  const { getExpensesByCategory, budgets } = useExpenseData();
  const expenses = getExpensesByCategory();

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  const pieData = Object.keys(expenses).map(key => ({
    name: key,
    value: expenses[key]
  }));

  const barData = Object.keys(budgets).map(key => ({
    name: key,
    Budget: budgets[key],
    Spent: expenses[key] || 0
  }));

  return (
    <div className="animate-fade-in">
      <h2 className="mb-4">Spending Trends & Analytics</h2>
      
      <div className="dashboard-grid">
        <div className="glass-panel text-center flex-center" style={{ flexDirection: 'column' }}>
          <h3 className="mb-4">Spending Breakdown</h3>
          <div style={{ height: '300px', width: '100%' }}>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    contentStyle={{ backgroundColor: 'var(--bg-card)', border: 'none', borderRadius: '8px' }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
                <p style={{ color: 'var(--text-secondary)', paddingTop: '100px' }}>No expenses recorded yet.</p>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ gridColumn: 'span 2' }}>
          <h3 className="mb-4">Budget vs Actual Spending</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
               <Tooltip 
                  formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend />
                <Bar dataKey="Budget" fill="var(--color-neutral)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Spent" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
