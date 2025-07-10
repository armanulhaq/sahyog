import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <header className="top-0 z-50 w-full px-8 md:px-20 lg:px-40 border-b-1">
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
                </div>
            </div>
        </header>
    );
};

export default Navbar;
