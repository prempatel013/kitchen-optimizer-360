
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Create a tomato special',
    description: 'Use expiring tomatoes in daily specials to reduce waste',
    impact: 'High'
  },
  {
    id: 2,
    title: 'Optimize chicken order',
    description: 'Reduce next chicken order by 10% based on usage patterns',
    impact: 'Medium'
  },
  {
    id: 3,
    title: 'Introduce combo meals',
    description: 'Bundle items with low sales to increase usage of ingredients',
    impact: 'Medium'
  },
];

const AIRecommendations = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium text-kitchen-teal">{rec.title}</h4>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="mt-1">
                  <span className={`pill ${rec.impact === 'High' ? 'pill-danger' : 'pill-warning'}`}>
                    {rec.impact} Impact
                  </span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
