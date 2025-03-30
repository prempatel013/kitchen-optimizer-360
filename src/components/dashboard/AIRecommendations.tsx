
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { inventoryService } from '@/services/inventory-service';

interface Recommendation {
  id: string | number;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch AI recommendations based on current inventory
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        // Get forecasting data from AI
        const forecastData = await inventoryService.getForecast();
        
        // Transform the data into recommendations
        if (forecastData && forecastData.recommendations) {
          setRecommendations(forecastData.recommendations);
        } else {
          // Fallback to default recommendations if AI doesn't provide any
          setRecommendations([
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
          ]);
        }
      } catch (error) {
        console.error('Error fetching AI recommendations:', error);
        // Set fallback recommendations on error
        setRecommendations([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();

    // Set up a refresh interval
    const intervalId = setInterval(fetchRecommendations, 30 * 60 * 1000); // Refresh every 30 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin h-8 w-8 border-4 border-kitchen-teal border-t-transparent rounded-full"></div>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
