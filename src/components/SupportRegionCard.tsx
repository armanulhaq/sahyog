import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Target, Users, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

type SupportRegionCardProps = {
    region: Region;
};

const SupportRegionCard = ({ region }: SupportRegionCardProps) => {
    const navigate = useNavigate();

    const progressPercentage: number = Math.round(
        (region.raised_amount / region.goal_amount) * 100
    );
    const remainingAmount: number = region.goal_amount - region.raised_amount;

    const formatCurrency = (amount: number) => {
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        }
        if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(0)}K`;
        }
        return `₹${amount}`;
    };

    return (
        <div
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate("/login")}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={region.image_url}
                    alt={`${region.name} - ${region.funding_purpose}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div className="absolute top-3 right-3 z-10">
                    {region.active ? (
                        <Badge
                            variant="default"
                            className="text-black bg-green-300"
                        >
                            Active
                        </Badge>
                    ) : (
                        <Badge
                            variant="secondary"
                            className="bg-gray-500 text-white"
                        >
                            Inactive
                        </Badge>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-10">
                    <h3 className="text-white font-bold text-2xl mb-1">
                        {region.name}
                    </h3>
                    <div className="flex items-center text-white text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>
                            {region.district}, {region.state}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center mb-3">
                    <Target className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-semibold text-gray-800">
                        {region.funding_purpose}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {region.short_description}
                </p>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            Progress
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                            {progressPercentage}%
                        </span>
                    </div>
                    <Progress
                        value={progressPercentage}
                        className="h-2 mb-3 bg-green-200"
                    />

                    <div className="flex justify-between text-sm">
                        <div>
                            <span className="text-gray-500">Raised: </span>
                            <span className="font-semibold text-red-500">
                                {formatCurrency(region.raised_amount)}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Goal: </span>
                            <span className="font-semibold text-green-500">
                                {formatCurrency(region.goal_amount)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 rounded-sm p-3 mb-4">
                    <div className="flex items-center justify-center text-center">
                        <Users className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">
                                {formatCurrency(remainingAmount)}
                            </span>{" "}
                            more needed
                        </span>
                    </div>
                </div>
                <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-sm transition-colors duration-200 cursor-pointer"
                    disabled={!region.active}
                >
                    <Heart className="w-4 h-4 mr-2" />
                    {region.active ? "Support This Cause" : "Campaign Ended"}
                </Button>
            </div>
        </div>
    );
};

export default SupportRegionCard;
