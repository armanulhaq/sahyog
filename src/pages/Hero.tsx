import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-3">
                    <div className="bg-green-100 text-green-800 text-xs md:text-md font-sm w-fit px-4 py-1 rounded-xl">
                        🇮🇳 Empowering Every Corner
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        <span className="text-gray-600">Bridge the Gap.</span>
                        <br />
                        <span className="text-green-600">Transform Lives.</span>
                    </h1>

                    <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed font-crimson">
                        Sahyog connects generous hearts with remote regions
                        across India. Fund essential amenities like clean water,
                        solar lighting, schools, and sanitation through
                        transparent, secure donations that create lasting
                        impact.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={() => navigate("/needs-your-support")}
                            size="lg"
                            className="bg-green-600 text-white text-lg px-8 py-6 rounded-xl hover:bg-green-700 duration-300 cursor-pointer "
                        >
                            Fund a Cause
                        </Button>

                        <Button
                            onClick={() => navigate("/impact")}
                            variant="outline"
                            size="lg"
                            className="border-2 border-green-600 text-gray-600 hover:bg-green-50 text-lg px-8 py-6 rounded-xl cursor-pointer"
                        >
                            Real Impact Stories
                        </Button>
                    </div>

                    <div className="flex items-center space-x-8 pt-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                500+
                            </div>
                            <div className="text-sm text-gray-600">
                                Villages Funded
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                ₹2.5Cr+
                            </div>
                            <div className="text-sm text-gray-600">
                                Total Donations
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                50k+
                            </div>
                            <div className="text-sm text-gray-600">
                                Lives Impacted
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <img
                        src="https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg"
                        alt="Indian village children"
                        className="w-full h-[500px] object-cover rounded-2xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
