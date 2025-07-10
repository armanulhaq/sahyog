import { XCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-red-100 rounded-full mb-6 animate-scale-in">
                        <XCircle className="w-16 h-16 text-red-600 animate-fade-in" />
                    </div>
                </div>

                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Payment Failed
                    </h1>
                    <p className="text-lg text-gray-600">
                        Your donation could not be processed at this time
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/")}
                        className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Return to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
