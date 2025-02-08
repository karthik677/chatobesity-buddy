
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-chat-sage/30 to-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Your Personal{" "}
            <span className="text-chat-mint">Weight Management Assistant</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Get personalized guidance on your journey to a healthier lifestyle. Our AI-powered assistant helps you make informed decisions about nutrition, exercise, and weight management.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chat-mint/10">
              <MessageSquare className="h-6 w-6 text-chat-mint" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Expert Guidance</h3>
            <p className="text-gray-600">
              Access evidence-based advice on weight management, diet, and exercise tailored to your needs.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chat-mint/10">
              <MessageSquare className="h-6 w-6 text-chat-mint" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">24/7 Support</h3>
            <p className="text-gray-600">
              Get instant answers to your questions about obesity reduction and healthy living anytime.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chat-mint/10">
              <MessageSquare className="h-6 w-6 text-chat-mint" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Practical Tips</h3>
            <p className="text-gray-600">
              Receive actionable suggestions and lifestyle modifications that fit your daily routine.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button
            onClick={() => navigate("/chat")}
            className="group gap-2 bg-chat-mint text-lg hover:bg-chat-mint/90"
          >
            Start Your Journey
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
