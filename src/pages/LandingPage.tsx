
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Check, ChartBar, Database, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <ChartBar className="h-6 w-6 text-kitchen-mint" />,
    title: 'Real-time Waste Analytics',
    description: 'Track and visualize waste patterns with intuitive dashboards that help identify problem areas instantly.'
  },
  {
    icon: <Database className="h-6 w-6 text-kitchen-mint" />,
    title: 'Smart Inventory Management',
    description: 'Use computer vision to automatically track inventory and receive alerts for items nearing expiration.'
  },
  {
    icon: <FileText className="h-6 w-6 text-kitchen-mint" />,
    title: 'AI-Powered Menu Optimization',
    description: 'Get data-driven recommendations for menu items that maximize ingredient usage and reduce waste.'
  },
  {
    icon: <Settings className="h-6 w-6 text-kitchen-mint" />,
    title: 'Customizable Waste Reduction Goals',
    description: 'Set and track progress toward your specific sustainability targets and cost-saving objectives.'
  }
];

const benefits = [
  'Reduce food waste by up to 30%',
  'Lower food costs by 12-15%',
  'Improve inventory turnover',
  'Enhance sustainability practices',
  'Optimize menu profitability',
  'Streamline kitchen operations'
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-kitchen-slate py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493962853295-0fd70327578a')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="block">Reduce Kitchen Waste.</span>
              <span className="block text-kitchen-mint">Maximize Profits.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              The AI-powered platform that helps restaurants minimize food waste, optimize inventory, and increase profitability through smart analytics and actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-kitchen-mint text-kitchen-slate hover:bg-kitchen-mint/90">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-kitchen-teal mb-4">Smart Solutions for Modern Kitchens</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform helps restaurant owners make data-driven decisions that reduce waste and boost profits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-kitchen-teal">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-kitchen-teal/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-kitchen-teal mb-6">Why Restaurants Choose Kitchen Optimizer 360</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our AI-powered platform delivers measurable results that directly impact your bottom line while supporting your sustainability goals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-kitchen-orange" />
                    </div>
                    <p className="ml-3 text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/dashboard">
                  <Button className="bg-kitchen-teal hover:bg-kitchen-teal/90">
                    Explore Dashboard
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
                  alt="Restaurant kitchen"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-border md:max-w-xs">
                <p className="font-medium text-kitchen-teal">
                  "We've reduced our food waste by 28% and saved over $2,000 monthly since implementing Kitchen Optimizer 360."
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  — Executive Chef, Fine Dining Restaurant
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-kitchen-orange/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-kitchen-teal mb-6">
            Ready to Transform Your Kitchen Operations?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join hundreds of restaurants already using Kitchen Optimizer 360 to reduce waste, cut costs, and boost profitability.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-kitchen-teal hover:bg-kitchen-teal/90">
              Get Started Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-kitchen-slate text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kitchen Optimizer 360</h3>
              <p className="text-gray-300">
                AI-powered kitchen management for modern restaurants.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Case Studies</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-300">contact@kitchenoptimizer.com</li>
                <li className="text-gray-300">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 Kitchen Optimizer 360. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
