
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, FileText, Download, Calendar } from 'lucide-react';

const weeklyData = [
  { name: 'Monday', waste: 32, target: 30 },
  { name: 'Tuesday', waste: 28, target: 30 },
  { name: 'Wednesday', waste: 35, target: 30 },
  { name: 'Thursday', waste: 25, target: 30 },
  { name: 'Friday', waste: 45, target: 30 },
  { name: 'Saturday', waste: 52, target: 30 },
  { name: 'Sunday', waste: 38, target: 30 },
];

const monthlyData = [
  { name: 'Jan', waste: 320, target: 300 },
  { name: 'Feb', waste: 280, target: 300 },
  { name: 'Mar', waste: 350, target: 300 },
  { name: 'Apr', waste: 250, target: 300 },
  { name: 'May', waste: 450, target: 300 },
  { name: 'Jun', waste: 380, target: 300 },
];

const wasteBySource = [
  { source: 'Spoilage', amount: '45 kg', percentage: '35%' },
  { source: 'Overproduction', amount: '30 kg', percentage: '25%' },
  { source: 'Trimmings', amount: '25 kg', percentage: '20%' },
  { source: 'Plate Waste', amount: '15 kg', percentage: '12%' },
  { source: 'Storage Loss', amount: '10 kg', percentage: '8%' },
];

const WasteReports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Waste Analytics</h1>
        <p className="text-muted-foreground">Track and analyze your restaurant's waste patterns to find opportunities for reduction.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div>
          <Button className="bg-kitchen-teal hover:bg-kitchen-teal/90">
            Record Waste Entry
          </Button>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Waste Tracking (kg)</CardTitle>
              <CardDescription>
                Compare daily waste against your target
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="waste" name="Actual Waste" fill="#E29578" />
                    <Bar dataKey="target" name="Target" fill="#006D77" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Waste Tracking (kg)</CardTitle>
              <CardDescription>
                Compare monthly waste against your target
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="waste" name="Actual Waste" fill="#E29578" />
                    <Bar dataKey="target" name="Target" fill="#006D77" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Waste Reduction Insights</CardTitle>
            <CardDescription>
              AI-generated recommendations based on your waste patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-medium text-kitchen-teal">High weekend waste detected</h3>
                <p className="text-sm text-muted-foreground mt-1">Your waste is consistently higher on weekends. Consider adjusting your prep quantities for Saturday service.</p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-medium text-kitchen-teal">Storage optimization needed</h3>
                <p className="text-sm text-muted-foreground mt-1">8% of waste comes from storage loss. Review your refrigeration and storage methods to extend shelf life.</p>
              </div>
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-medium text-kitchen-teal">Overproduction patterns identified</h3>
                <p className="text-sm text-muted-foreground mt-1">25% of waste is from overproduction. Implement batch cooking for select items during slower periods.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waste by Source</CardTitle>
            <CardDescription>
              Breakdown of waste categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wasteBySource.map((item) => (
                <div key={item.source} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.source}</div>
                    <div className="text-sm text-muted-foreground">{item.amount}</div>
                  </div>
                  <div>
                    <div className="text-right font-medium">{item.percentage}</div>
                    <div className="w-full bg-muted h-2 rounded-full mt-1">
                      <div 
                        className="bg-kitchen-teal h-2 rounded-full" 
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WasteReports;
