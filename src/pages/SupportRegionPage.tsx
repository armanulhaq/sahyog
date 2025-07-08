import SupportRegionCard from "@/components/SupportRegionCard";
import { supabase } from "@/lib/client";
import { useEffect, useState } from "react";

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

    const [regions, setRegions] = useState<Region[]>([]); //array with elements of Region type

    useEffect(() => {
        const fetchRegions = async () => {
            const { data, error } = await supabase.from("regions").select("*");

            if (error) {
                console.log("Error fetching data from the supabase", error);
            } else {
                setRegions(data || []);
            }
        };
        fetchRegions();
    }, []);
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 py-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Support Rural Communities
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Bridge the gap and transform lives by supporting
                        essential infrastructure projects in remote regions
                        across India.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regions.map((region) => {
                    return (
                        <SupportRegionCard key={region.id} region={region} />
                    );
                })}
            </div>
        </>
    );
};

export default SupportRegionPage;
