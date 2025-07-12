import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/client";
import { Button } from "./ui/button";
import type { User } from "@supabase/supabase-js";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchUser();

        const { data: listener } = supabase.auth.onAuthStateChange(
            // Listens for login/logout events
            (_event, session) => {
                setUser(session?.user || null);
            }
        );

        return () => listener.subscription.unsubscribe(); //This removes the listener when the component is destroyed
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        navigate("/");
    };

    return (
        <header className="top-0 z-50 w-full px-8 md:px-20 lg:px-40">
            <div className="flex h-20 items-center justify-between w-full">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        <img src="/sahyog.png" alt="Sahyog Logo" />
                    </div>
                    <span className="font-bold text-2xl font-poppins text-gray-800">
                        Sahyog
                    </span>
                </div>

                <div className="flex items-center space-x-8">
                    {user ? (
                        <div className="flex gap-6">
                            <div
                                className="text-gray-800 cursor-pointer underline flex items-center justify-center"
                                onClick={() => navigate("/my-donations")}
                            >
                                My Donations
                            </div>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                onClick={handleLogout}
                            >
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-5">
                            <Button
                                className="bg-green-600 hover:bg-white hover:text-black hover:border-1 hover:border-green-500 cursor-pointer"
                                onClick={() => navigate("login")}
                            >
                                Sign In
                            </Button>
                            <Button
                                className="border-1 border-green-600 hover:bg-green-50 bg-white text-black cursor-pointer"
                                onClick={() => navigate("signup")}
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
