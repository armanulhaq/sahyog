import { Button } from "@/components/ui/button";
import { CheckCircle, Home, HandHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Success = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState<null | {
        funding_purpose: string;
        area: string;
        state: string;
        district: string;
    }>(null);

    useEffect(() => {
        const stored = localStorage.getItem("lastDonatedProject");
        if (stored) {
            setProject(JSON.parse(stored));
            localStorage.removeItem("lastDonatedProject");
        }
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <div className="max-w-3xl w-fullrounded-3xl border-1 border-gray-200 p-10 text-center animate-fade-in">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-14 h-14 text-green-600" />
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-green-700 mb-4">
                    Thank You for Your Generosity!
                </h1>

                <p className="text-lg text-gray-700 mb-4">
                    Your contribution has been successfully received.
                </p>

                {project && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6 mb-6 shadow-sm">
                        <p className="text-md text-green-800 font-medium">
                            💚 You supported the cause:{" "}
                            <span className="font-bold text-green-900">
                                {project.funding_purpose}
                            </span>
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                            📍 Location: {project.area}, {project.district},{" "}
                            {project.state}
                        </p>
                    </div>
                )}

                <p className="text-gray-600 mb-8">
                    Your kindness helps create real change in the lives of those
                    in need. We are truly grateful for your support.
                </p>

                <div className="flex justify-center gap-4">
                    <Button
                        onClick={() => navigate("/")}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition-transform transform hover:scale-105"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Back to Home
                    </Button>
                </div>

                <div className="mt-10 text-sm text-gray-400 flex items-center justify-center gap-2">
                    <HandHeart className="w-4 h-4" />
                    <span>Powered by Sahyog | Together we rise</span>
                </div>
            </div>
        </div>
    );
};

export default Success;
