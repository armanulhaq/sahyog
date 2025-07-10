import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-scale-in">
                        <CheckCircle className="w-12 h-12 text-green-600 animate-fade-in" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
                        Thank You for Your Support!
                    </h1>
                    <p className="text-xl text-gray-600 animate-fade-in">
                        Your donation has been successfully processed
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/")}
                        className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Return to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Success;
