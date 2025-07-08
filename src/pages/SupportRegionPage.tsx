import SupportRegionCard from "@/components/SupportRegionCard";
import { supabase } from "@/lib/client";
import { useEffect, useState } from "react";
import { Heart, Target, Users } from "lucide-react";

const SupportRegionPage = () => {
    type Region = {
        id: number;
        name: string;
        state: string;
        district: string;
        funding_purpose: string;
        short_description: string;
        image_url: string;
        goal_amount: number;
        raised_amount: number;
        active: boolean;
    };

    const [regions, setRegions] = useState<Region[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRegions = async () => {
            setIsLoading(true);
            const { data, error } = await supabase.from("regions").select("*");

            if (error) {
                console.log("Error fetching data from the supabase", error);
            } else {
                setRegions(data || []);
            }
            setIsLoading(false);
        };
        fetchRegions();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
                <div className="flex justify-center items-center h-[70vh]">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-green-400 rounded-full animate-spin animate-reverse"></div>
                        </div>
                        <p className="text-gray-600 font-medium">
                            Loading communities...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const totalRaised = regions.reduce(
        (sum, region) => sum + region.raised_amount,
        0
    );
    const activeRegions = regions.filter((region) => region.active).length;

    const formatCurrency = (amount: number) => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(1)}Cr`;
        }
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        }
        if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(0)}K`;
        }
        return `₹${amount}`;
    };

    return (
        <>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
                <div className="text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Support Rural
                        <span className="text-green-600 block">
                            Communities
                        </span>
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Bridge the gap and transform lives by supporting
                        essential infrastructure projects in remote regions
                        across India. Every contribution creates lasting impact.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                            <div className="flex items-center justify-center mb-2">
                                <Target className="w-6 h-6 text-green-600 mr-2" />
                                <span className="text-2xl font-bold text-gray-900">
                                    {activeRegions}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">
                                Active Projects
                            </p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                            <div className="flex items-center justify-center mb-2">
                                <Heart className="w-6 h-6 text-green-600 mr-2" />
                                <span className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalRaised)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">
                                Total Raised
                            </p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="w-6 h-6 text-green-600 mr-2" />
                                <span className="text-2xl font-bold text-gray-900">
                                    {regions.length}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">
                                Communities
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {regions.map((region) => (
                        <SupportRegionCard key={region.id} region={region} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SupportRegionPage;
