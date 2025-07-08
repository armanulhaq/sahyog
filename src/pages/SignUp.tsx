import { useState } from "react";
import { supabase } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, UserPlus, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) alert("Signup failed: " + error.message);
        else {
            setIsLoading(false);
            navigate("/needs-your-support");
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-4 text-center">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Join Our Mission
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Create your account and start making a difference in
                        rural communities
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </Label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700"
                            >
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a secure password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                Password should be at least 8 characters long
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating account...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2 ">
                                    <UserPlus className="w-4 h-4" />
                                    <span>Create Account</span>
                                </div>
                            )}
                        </Button>
                    </form>

                    <div
                        className="mt-6 text-center"
                        onClick={() => navigate("/login")}
                    >
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <a
                                href="#"
                                className="text-green-600 hover:text-green-700 font-medium hover:underline"
                            >
                                Sign in here
                            </a>
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            By creating an account, you agree to our Terms of
                            Service and Privacy Policy
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;
