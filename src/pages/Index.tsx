import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Dashboard from "@/components/Dashboard";
import AddProduct from "@/components/AddProduct";
import MonitoringView from "@/components/MonitoringView";
import { useToast } from "@/hooks/use-toast";

type Screen = "splash" | "dashboard" | "add-product" | "monitoring";

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

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const { toast } = useToast();

  const handleSplashComplete = () => {
    setCurrentScreen("dashboard");
  };

  const handleAddProduct = () => {
    setCurrentScreen("add-product");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
    setSelectedItem(null);
  };

  const handleProductAdded = (product: FoodItem) => {
    toast({
      title: "Product Added! 🎉",
      description: `${product.name} is now being monitored for freshness.`,
    });
    setCurrentScreen("dashboard");
  };

  const handleViewItem = (item: FoodItem) => {
    setSelectedItem(item);
    setCurrentScreen("monitoring");
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "splash" && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      
      {currentScreen === "dashboard" && (
        <Dashboard 
          onAddProduct={handleAddProduct}
          onViewItem={handleViewItem}
        />
      )}
      
      {currentScreen === "add-product" && (
        <AddProduct 
          onBack={handleBackToDashboard}
          onProductAdded={handleProductAdded}
        />
      )}
      
      {currentScreen === "monitoring" && selectedItem && (
        <MonitoringView 
          item={selectedItem}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default Index;
