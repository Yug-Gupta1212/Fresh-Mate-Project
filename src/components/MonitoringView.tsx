import { useState, useEffect } from "react";
import { ArrowLeft, Thermometer, Droplets, Wind, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface MonitoringViewProps {
  item: FoodItem;
  onBack: () => void;
}

const MonitoringView = ({ item, onBack }: MonitoringViewProps) => {
  const [currentTemp, setCurrentTemp] = useState(item.temperature);
  const [currentHumidity, setCurrentHumidity] = useState(item.humidity);
  const [currentGas, setCurrentGas] = useState(item.gasLevel);
  const [currentFreshness, setCurrentFreshness] = useState(item.freshness);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemp(prev => prev + (Math.random() - 0.5) * 2);
      setCurrentHumidity(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)));
      setCurrentGas(prev => Math.max(0, prev + (Math.random() - 0.5) * 3));
      setCurrentFreshness(prev => Math.max(0, prev - 0.1)); // Gradual decline
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "fresh":
        return {
          color: "text-fresh",
          bgColor: "bg-fresh/10",
          emoji: "🟢",
          message: "Product is fresh and safe to consume"
        };
      case "warning":
        return {
          color: "text-warning", 
          bgColor: "bg-warning/10",
          emoji: "🟡",
          message: "Consider consuming soon"
        };
      case "spoiled":
        return {
          color: "text-danger",
          bgColor: "bg-danger/10", 
          emoji: "🔴",
          message: "Product may be spoiled - check before consuming"
        };
    }
  };

  const config = getStatusConfig(item.status);

  // Mock historical data
  const historicalData = Array.from({ length: 24 }, (_, i) => ({
    time: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
    temperature: item.temperature + Math.sin(i / 4) * 3 + (Math.random() - 0.5),
    gas: item.gasLevel + Math.sin(i / 6) * 5 + (Math.random() - 0.5) * 2,
    freshness: Math.max(0, item.freshness - (i * 2))
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4 animate-fade-in">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{item.name}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{item.type}</Badge>
            <Badge variant="secondary">{item.category}</Badge>
          </div>
        </div>
      </header>

      {/* Real-time Status Card */}
      <Card className={`mb-6 animate-slide-up ${config?.bgColor}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{config?.emoji}</span>
              <div>
                <h3 className="text-lg font-semibold">Freshness Status</h3>
                <p className="text-sm text-muted-foreground">{config?.message}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${config?.color}`}>
                {Math.round(currentFreshness)}%
              </div>
              <div className="text-xs text-muted-foreground">
                {item.expiryDays > 0 ? `${item.expiryDays} days left` : "Expired"}
              </div>
            </div>
          </div>
          <Progress value={currentFreshness} className="h-2" />
        </CardContent>
      </Card>

      {/* Live Sensor Readings */}
      <Card className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📡 Live Sensor Data
            <Badge variant="outline" className="animate-pulse">
              <Clock className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Thermometer className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-lg font-bold">{currentTemp.toFixed(1)}°C</div>
              <div className="text-xs text-muted-foreground">Temperature</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-lg font-bold">{currentHumidity.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Humidity</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Wind className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="text-lg font-bold">{currentGas.toFixed(1)}ppm</div>
              <div className="text-xs text-muted-foreground">Gas Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="overview" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Added</div>
                  <div className="font-medium">
                    {item.addedDate.toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="font-medium capitalize">{item.type} {item.category}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Recommendation</div>
                <div className={`p-3 rounded-lg ${config?.bgColor} flex items-start gap-2`}>
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${config?.color}`} />
                  <div className="text-sm">
                    {currentFreshness > 70 ? "Product is fresh. Store properly to maintain quality." :
                     currentFreshness > 40 ? "Consider consuming within 1-2 days for best quality." :
                     "Check product carefully before consuming. Consider discarding if signs of spoilage."}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  📈
                </div>
                <p>Trend graphs will be available after 24 hours of monitoring</p>
                <p className="text-sm mt-2">Current monitoring: {Math.floor((Date.now() - item.addedDate.getTime()) / (1000 * 60 * 60))} hours</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Readings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {historicalData.slice(-10).reverse().map((reading, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                    <div className="text-muted-foreground">
                      {reading.time.toLocaleTimeString()}
                    </div>
                    <div className="flex gap-4">
                      <span>{reading.temperature.toFixed(1)}°C</span>
                      <span>{reading.gas.toFixed(1)}ppm</span>  
                      <span className="font-medium">{reading.freshness.toFixed(0)}%</span>
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

export default MonitoringView;