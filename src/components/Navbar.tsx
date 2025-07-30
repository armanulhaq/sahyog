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
                setUser(session?.user || null); //If the session exists → set user to session.user, if session is null (i.e. user logged out) → set user to null.
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
        <header className="top-0 z-50 w-full px-8 md:px-20 xl:px-40">
            <div className="flex h-20 items-center justify-between w-full">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <div className="lg:w-8 lg:h-8 w-6 h-6 rounded-full flex items-center justify-center">
                        <img src="/sahyog.png" alt="Sahyog Logo" />
                    </div>
                    <span className="lg:text-2xl text-lg font-bold text-gray-800">
                        Sahyog
                    </span>
                </div>

                <div className="flex items-center space-x-8">
                    {user ? (
                        <div className="flex xl:gap-6 gap-3">
                            <div
                                className="xl:text-md text-sm text-green-600 cursor-pointer underline flex items-center justify-center"
                                onClick={() => navigate("/my-donations")}
                            >
                                <span>My Donations</span>
                            </div>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white xl:text-md text-sm rounded-sm cursor-pointer p-3"
                                onClick={handleLogout}
                            >
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex xl:gap-6 gap-3">
                            <Button
                                className="bg-green-600  text-sm hover:bg-white hover:text-black hover:border-1 hover:border-green-500 cursor-pointer rounded-sm"
                                onClick={() => navigate("login")}
                            >
                                Sign In
                            </Button>
                            <Button
                                className="border-1 border-green-600 text-sm hover:bg-green-50 bg-white text-black cursor-pointer rounded-sm"
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
