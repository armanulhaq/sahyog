import { Button } from "./ui/button";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="flex h-20 items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        <img src="../public/gramfund.png" alt="GramFund Logo" />
                    </div>
                    <span className="font-bold text-2xl font-poppins text-gray-600">
                        Gram<span className="text-green-600">Fund</span>
                    </span>
                </div>

                <div className="flex items-center space-x-8">
                    <div>About</div>
                    <div>
                        <Button className="bg-green-600">Sign In</Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
