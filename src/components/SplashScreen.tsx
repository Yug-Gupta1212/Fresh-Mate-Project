import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import heroImage from "@/assets/freshmate-hero.jpg";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "var(--gradient-primary)",
      }}
    >
      <div className="text-center space-y-6 px-6">
        {/* Hero Image */}
        <div className="relative mb-8 animate-scale-in">
          <img 
            src={heroImage} 
            alt="Fresh food arrangement" 
            className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg ring-4 ring-white/20"
          />
        </div>

        {/* Logo and Brand */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl animate-pulse-glow">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              FreshMate
            </h1>
          </div>
          
          <p className="text-white/90 text-lg font-medium max-w-sm mx-auto leading-relaxed">
            Your Food Freshness Companion
          </p>
          
          <p className="text-white/70 text-sm mt-2 max-w-xs mx-auto">
            Smart monitoring • Real-time alerts • Zero waste
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center mt-8 animate-fade-in">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;