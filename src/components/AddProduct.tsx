import { useState } from "react";
import { ArrowLeft, Thermometer, Droplets, Wind, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddProductProps {
  onBack: () => void;
  onProductAdded: (product: any) => void;
}

const AddProduct = ({ onBack, onProductAdded }: AddProductProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "raw" as "raw" | "cooked",
    category: "",
    temperature: "",
    humidity: "",
    gasLevel: ""
  });

  const [inputMode, setInputMode] = useState<"manual" | "iot">("manual");

  const categories = [
    "Fruit", "Vegetable", "Meat", "Dairy", "Grain", "Bakery", "Seafood", "Herbs", "Nuts", "Packaged Food", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      type: formData.type,
      freshness: Math.floor(Math.random() * 40) + 60, // Mock freshness calculation
      status: "fresh" as const,
      addedDate: new Date(),
      expiryDays: Math.floor(Math.random() * 7) + 1,
      temperature: parseFloat(formData.temperature) || 20,
      humidity: parseFloat(formData.humidity) || 60,
      gasLevel: parseFloat(formData.gasLevel) || 15
    };

    onProductAdded(newProduct);
  };

  const simulateIoTReading = () => {
    setFormData(prev => ({
      ...prev,
      temperature: (Math.random() * 30 + 2).toFixed(1),
      humidity: (Math.random() * 40 + 40).toFixed(1),
      gasLevel: (Math.random() * 30 + 10).toFixed(1)
    }));
  };

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
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add Product</h1>
          <p className="text-muted-foreground">Monitor new food item</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Details */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🍎 Product Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="e.g., Fresh Milk, Organic Apples"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label>Food Type</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value: "raw" | "cooked") => 
                  setFormData(prev => ({ ...prev, type: value }))
                }
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="raw" id="raw" />
                  <Label htmlFor="raw">Raw Food</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cooked" id="cooked" />
                  <Label htmlFor="cooked">Cooked Food</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select food category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sensor Data */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Sensor Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={inputMode} onValueChange={(value: any) => setInputMode(value)}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="manual">Manual Input</TabsTrigger>
                <TabsTrigger value="iot">IoT Mode</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="temperature" className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      Temperature (°C)
                    </Label>
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="e.g., 4"
                      value={formData.temperature}
                      onChange={(e) => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="humidity" className="flex items-center gap-2">
                      <Droplets className="w-4 h-4" />
                      Humidity (%)
                    </Label>
                    <Input
                      id="humidity"
                      type="number"
                      placeholder="e.g., 65"
                      value={formData.humidity}
                      onChange={(e) => setFormData(prev => ({ ...prev, humidity: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gasLevel" className="flex items-center gap-2">
                      <Wind className="w-4 h-4" />
                      Gas Level (ppm)
                    </Label>
                    <Input
                      id="gasLevel"
                      type="number"
                      placeholder="e.g., 15"
                      value={formData.gasLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, gasLevel: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="iot" className="space-y-4">
                <div className="text-center p-6 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                  <div className="text-muted-foreground mb-4">
                    🔗 Connect to ESP32 sensor
                  </div>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={simulateIoTReading}
                    className="mb-4"
                  >
                    Simulate Live Reading
                  </Button>
                  
                  {formData.temperature && (
                    <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-medium">🌡️ {formData.temperature}°C</div>
                        <div className="text-muted-foreground">Temperature</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-medium">💧 {formData.humidity}%</div>
                        <div className="text-muted-foreground">Humidity</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="font-medium">💨 {formData.gasLevel}ppm</div>
                        <div className="text-muted-foreground">Gas Level</div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          type="submit"
          className="w-full py-6 text-lg font-semibold animate-slide-up"
          style={{ background: "var(--gradient-primary)", animationDelay: "0.2s" }}
          disabled={!formData.name || !formData.category}
        >
          <Save className="w-5 h-5 mr-2" />
          Add Product & Start Monitoring
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;