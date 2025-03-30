
import React from 'react';
import { ChartBar, Database, ArrowDown, Utensils } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import WasteByCategory from '@/components/dashboard/WasteByCategory';
import InventoryAlerts from '@/components/dashboard/InventoryAlerts';
import WasteOverTime from '@/components/dashboard/WasteOverTime';
import AIRecommendations from '@/components/dashboard/AIRecommendations';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your kitchen metrics and waste reduction progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Waste Reduction" 
          value="24.8%" 
          icon={<ArrowDown className="h-5 w-5" />} 
          change="↓ 5.3% from last month" 
          changeType="positive" 
        />
        <StatCard 
          title="Food Cost Saved" 
          value="$2,456" 
          icon={<ChartBar className="h-5 w-5" />} 
          change="↑ $320 from last month" 
          changeType="positive" 
        />
        <StatCard 
          title="Inventory Items" 
          value="128" 
          icon={<Database className="h-5 w-5" />} 
          change="15 items near expiry" 
          changeType="negative" 
        />
        <StatCard 
          title="Menu Efficiency" 
          value="86%" 
          icon={<Utensils className="h-5 w-5" />} 
          change="↑ 3.2% from last month" 
          changeType="positive" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WasteByCategory />
        <InventoryAlerts />
        <WasteOverTime />
        <AIRecommendations />
      </div>
    </div>
  );
};

export default Dashboard;
