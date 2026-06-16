import React, { useState, useEffect } from 'react';
import { ShoppingBag, Users, DollarSign, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalSales: 45290.00, // Dummy data for sales
    inventoryValue: 124500.00 // Dummy data
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes] = await Promise.all([
          api.get('/products'),
        ]);
        setStats(prev => ({
          ...prev,
          totalProducts: productsRes.data.length,
          totalUsers: 154 // Dummy data
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500', trend: '+5%' },
    { title: 'Registered Users', value: stats.totalUsers, icon: Users, color: 'bg-purple-500', trend: '+12%' },
    { title: 'Total Sales', value: `$${stats.totalSales.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', trend: '+8%' },
    { title: 'Inventory Value', value: `$${stats.inventoryValue.toLocaleString()}`, icon: ShoppingBag, color: 'bg-amber-500', trend: '-2%' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-sm ${card.color} text-white`}>
                <card.icon size={24} />
              </div>
              <span className={`flex items-center text-xs font-bold ${card.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {card.trend}
                {card.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </span>
            </div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
          <h3 className="text-lg font-serif font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-secondary font-bold mr-4">
                    U
                  </div>
                  <div>
                    <p className="text-sm font-bold">New user registered</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <button className="text-xs text-secondary font-bold hover:underline">VIEW</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
          <h3 className="text-lg font-serif font-bold mb-6">Inventory Alerts</h3>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-sm">
                <div className="flex items-center">
                  <Package className="text-red-500 mr-4" size={20} />
                  <div>
                    <p className="text-sm font-bold text-red-700">Low stock alert: Chanel N°5</p>
                    <p className="text-xs text-red-500">Only 2 items left in stock</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-sm">RESTOCK</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
