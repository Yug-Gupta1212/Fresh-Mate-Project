import { useState } from "react";
import { Plus, Bell, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface FoodItem {
  id: string;
  name: string;
  category: string;
  type: "raw" | "cooked";
  freshness: number;
  status: "fresh" | "warning" | "spoiled";
  addedDate: Date;
  expiryDays: number;
  temperature: number;
  humidity: number;
  gasLevel: number;
}

interface DashboardProps {
  onAddProduct: () => void;
  onViewItem: (item: FoodItem) => void;
}

const Dashboard = ({ onAddProduct, onViewItem }: DashboardProps) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: "1",
      name: "Fresh Milk",
      category: "Dairy",
      type: "raw",
      freshness: 85,
      status: "fresh",
      addedDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      expiryDays: 3,
      temperature: 4,
      humidity: 75,
      gasLevel: 12
    },
    {
      id: "2", 
      name: "Organic Bananas",
      category: "Fruit",
      type: "raw",
      freshness: 60,
      status: "warning",
      addedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      expiryDays: 1,
      temperature: 22,
      humidity: 68,
      gasLevel: 28
    },
    {
      id: "3",
      name: "Chicken Breast",
      category: "Meat",
      type: "raw", 
      freshness: 25,
      status: "spoiled",
      addedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      expiryDays: 0,
      temperature: 8,
      humidity: 82,
      gasLevel: 45
    }
  ]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "fresh":
        return {
          icon: CheckCircle,
          color: "text-fresh",
          bgColor: "bg-fresh/10",
          shadowClass: "shadow-fresh",
          emoji: "🟢"
        };
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-warning",
          bgColor: "bg-warning/10", 
          shadowClass: "shadow-warning",
          emoji: "🟡"
        };
      case "spoiled":
        return {
          icon: AlertTriangle,
          color: "text-danger",
          bgColor: "bg-danger/10",
          shadowClass: "shadow-danger", 
          emoji: "🔴"
        };
      default:
        return {
          icon: CheckCircle,
          color: "text-muted-foreground",
          bgColor: "bg-muted",
          shadowClass: "shadow-soft",
          emoji: "⚪"
        };
    }
  };

  const handleSwipeRemove = (id: string) => {
    setFoodItems(items => items.filter(item => item.id !== id));
  };

  const freshCount = foodItems.filter(item => item.status === "fresh").length;
  const warningCount = foodItems.filter(item => item.status === "warning").length;
  const spoiledCount = foodItems.filter(item => item.status === "spoiled").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4 animate-fade-in">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">FreshMate</h1>
          <p className="text-muted-foreground">Monitor your food freshness</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="relative">
            <Bell className="w-4 h-4" />
            {(warningCount + spoiledCount) > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-danger text-danger-foreground text-xs">
                {warningCount + spoiledCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="text-center">
            <div className="text-fresh text-lg font-bold">🟢 {freshCount}</div>
            <div className="text-xs text-muted-foreground">Fresh</div>
          </div>
        </Card>
        <Card className="p-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="text-center">
            <div className="text-warning text-lg font-bold">🟡 {warningCount}</div>
            <div className="text-xs text-muted-foreground">Expiring</div>
          </div>
        </Card>
        <Card className="p-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="text-center">
            <div className="text-danger text-lg font-bold">🔴 {spoiledCount}</div>
            <div className="text-xs text-muted-foreground">Spoiled</div>
          </div>
        </Card>
      </div>

      {/* Food Items List */}
      <div className="space-y-4 mb-20">
        {foodItems.map((item, index) => {
          const config = getStatusConfig(item.status);
          const StatusIcon = config.icon;
          
          return (
            <Card 
              key={item.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${config.shadowClass} animate-slide-up`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              onClick={() => onViewItem(item)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-full ${config.bgColor}`}>
                      <StatusIcon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <span className="text-lg">{config.emoji}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{item.category}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Freshness</span>
                          <span className={`font-medium ${config.color}`}>
                            {item.freshness}%
                          </span>
                        </div>
                        <Progress 
                          value={item.freshness} 
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      {item.expiryDays > 0 ? `${item.expiryDays} days left` : "Expired"}
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSwipeRemove(item.id);
                      }}
                      className="text-xs opacity-60 hover:opacity-100"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Floating Add Button */}
      <Button
        onClick={onAddProduct}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg animate-pulse-glow z-10"
        style={{ background: "var(--gradient-primary)" }}
      >
        <Plus className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
};

export default Dashboard;