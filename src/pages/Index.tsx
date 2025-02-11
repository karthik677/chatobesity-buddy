import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, Activity, Clock, Coffee } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-chat-mint/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-chat-mint/10 transition-transform duration-300 group-hover:scale-110">
      <Icon className="h-7 w-7 text-chat-mint transition-colors duration-300" />
    </div>
    <h3 className="mb-3 text-xl font-semibold text-gray-900 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600 transition-colors duration-300">
      {description}
    </p>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Activity,
      title: "Expert Guidance",
      description: "Access evidence-based advice on weight management, diet, and exercise tailored to your unique needs and goals."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Get instant answers to your questions about obesity reduction and healthy living anytime, anywhere you need it."
    },
    {
      icon: Coffee,
      title: "Practical Tips",
      description: "Receive actionable suggestions and lifestyle modifications that seamlessly integrate into your daily routine."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-chat-sage/30 via-white to-chat-sage/10">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {" "}
            <span className="relative inline-block text-chat-mint">
              <span className="relative animate-slide-up">
                WellnessBot
              </span>
              <span className="absolute bottom-0 left-0 h-1 w-full bg-chat-mint/30 animate-grow-width" />
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-600 animate-fade-in-delay">
            Get personalized guidance on your journey to a healthier lifestyle. Our AI-powered assistant helps you make informed decisions about nutrition, exercise, and weight management.
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.title} 
                 className="animate-fade-in-up"
                 style={{ animationDelay: `${index * 150}ms` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button
            onClick={() => navigate("/chat")}
            className="group relative overflow-hidden rounded-full bg-chat-mint px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:bg-chat-mint/90 hover:shadow-lg hover:shadow-chat-mint/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-shine" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes grow-width {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }

        .animate-grow-width {
          animation: grow-width 1s ease-out 0.5s forwards;
          transform-origin: left;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-shine {
          animation: shine 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
