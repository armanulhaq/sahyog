import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="xl:py-20 px-10">
            <div className="grid xl:grid-cols-2 gap-12 items-center">
                <div className="space-y-3">
                    <div className="bg-green-100 text-green-800 text-xs md:text-md font-sm w-fit xl:px-4 px-2 py-1 rounded-xl">
                        🇮🇳 Empowering Every Corner
                    </div>

                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight">
                        <span className="text-gray-600">Bridge the Gap.</span>
                        <br />
                        <span className="text-green-600">Transform Lives.</span>
                    </h1>

                    <p className="text-md md:text-lg xl:text-xl text-gray-500/90 leading-relaxed">
                        Sahyog connects generous hearts with remote regions
                        across India. Fund essential amenities like clean water,
                        solar lighting, schools, and sanitation through
                        transparent, secure donations that create lasting
                        impact.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                        <Button
                            onClick={() => navigate("/needs-your-support")}
                            size="lg"
                            className="bg-green-600 text-white text-lg px-8 py-6 hover:bg-green-700 duration-300 cursor-pointer rounded-sm"
                        >
                            Fund a Cause
                        </Button>
                    </div>

                    <div className="flex items-center space-x-8 pt-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                50+
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
                        className="w-full h-[500px] object-cover rounded-sm"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
