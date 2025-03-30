
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Plus, ArrowUp, ArrowDown } from 'lucide-react';

const recipes = [
  { 
    id: 1, 
    name: 'Tomato Basil Pasta', 
    ingredients: 'Pasta, Tomato, Basil, Olive Oil, Garlic', 
    profitMargin: '72%', 
    wasteReduction: 'High',
    trending: true
  },
  { 
    id: 2, 
    name: 'Chicken Stir Fry', 
    ingredients: 'Chicken, Bell Peppers, Onions, Soy Sauce, Rice', 
    profitMargin: '68%', 
    wasteReduction: 'Medium',
    trending: false
  },
  { 
    id: 3, 
    name: 'Veggie Burger', 
    ingredients: 'Black Beans, Mushrooms, Breadcrumbs, Lettuce, Tomato', 
    profitMargin: '65%', 
    wasteReduction: 'High',
    trending: true
  },
  { 
    id: 4, 
    name: 'Fish Tacos', 
    ingredients: 'White Fish, Cabbage, Lime, Cilantro, Corn Tortillas', 
    profitMargin: '70%', 
    wasteReduction: 'Low',
    trending: false
  },
  { 
    id: 5, 
    name: 'Mediterranean Salad', 
    ingredients: 'Cucumber, Tomato, Feta, Olives, Red Onion', 
    profitMargin: '75%', 
    wasteReduction: 'Medium',
    trending: false
  },
];

const aiSuggestions = [
  {
    id: 1,
    name: 'Tomato Gazpacho',
    reason: 'Uses 3 ingredients that will expire within 2 days',
    ingredients: 'Tomatoes, Cucumber, Bell Peppers, Garlic, Bread',
    estimatedProfit: '78%'
  },
  {
    id: 2,
    name: 'Chicken Lettuce Wraps',
    reason: 'Utilizes excess chicken and lettuce inventory',
    ingredients: 'Chicken, Lettuce, Carrots, Water Chestnuts, Hoisin Sauce',
    estimatedProfit: '65%'
  },
  {
    id: 3,
    name: 'Berry Parfait',
    reason: 'Uses yogurt nearing expiration date',
    ingredients: 'Yogurt, Mixed Berries, Granola, Honey',
    estimatedProfit: '72%'
  }
];

const MenuOptimization = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Menu Optimization</h1>
        <p className="text-muted-foreground">Analyze and optimize your menu for waste reduction and profit maximization.</p>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Menu</TabsTrigger>
          <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">Current Menu Items</h2>
              <p className="text-sm text-muted-foreground">Performance analytics for your menu</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Menu Item
            </Button>
          </div>
          
          <div className="space-y-4">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden">
                <div className="border-l-4 border-kitchen-teal flex flex-col sm:flex-row">
                  <div className="flex-1 p-4">
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-semibold">{recipe.name}</h3>
                      {recipe.trending && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-kitchen-amber px-2 py-1 text-xs font-medium text-kitchen-slate">
                          Trending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Ingredients: {recipe.ingredients}</p>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Profit:</span>
                        <span className="ml-1 text-sm text-green-600 flex items-center">{recipe.profitMargin} <ArrowUp className="ml-1 h-3 w-3" /></span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Waste Reduction:</span>
                        <span 
                          className={`ml-1 text-sm ${
                            recipe.wasteReduction === 'High' ? 'text-green-600' : 
                            recipe.wasteReduction === 'Medium' ? 'text-amber-600' : 
                            'text-red-600'
                          }`}
                        >
                          {recipe.wasteReduction}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-4 border-t sm:border-t-0 sm:border-l border-border">
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    <Button variant="outline" size="sm">View Stats</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-kitchen-orange" />
                AI-Generated Recipe Suggestions
              </CardTitle>
              <CardDescription>
                Based on your current inventory and waste reduction goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {aiSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-4 border rounded-lg bg-muted/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-kitchen-teal">{suggestion.name}</h3>
                      <div className="mt-1 sm:mt-0">
                        <span className="pill pill-success">
                          {suggestion.estimatedProfit} Est. Profit
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-kitchen-orange font-medium mb-1">{suggestion.reason}</p>
                    <p className="text-sm text-muted-foreground mb-4">Ingredients: {suggestion.ingredients}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-kitchen-teal hover:bg-kitchen-teal/90">
                        Add to Menu
                      </Button>
                      <Button size="sm" variant="outline">
                        Save for Later
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuOptimization;
