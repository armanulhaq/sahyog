import { supabase } from "@/lib/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    MapPin,
    Phone,
    Mail,
    Users,
    Target,
    Heart,
    IndianRupee,
    HandHelping,
    TrendingUp,
} from "lucide-react";
import Loader from "@/components/Loader";
import { loadStripe } from "@stripe/stripe-js";

const Details = () => {
    type FullRegionData = {
        id: number;
        created_at: string;
        name: string;
        area: string;
        state: string;
        district: string;
        funding_purpose: string;
        short_description: string;
        long_description: string;
        latitude: number;
        longitude: number;
        cost_breakdown: Array<{ item: string; amount: number }>;
        image_url: string;
        goal_amount: number;
        raised_amount: number;
        contact_person_name: string;
        contact_person_email: string;
        contact_person_phone: number;
        active: boolean;
    };

    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<FullRegionData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fixedAmounts = [1000, 10000, 100000];
    const [amount, setAmount] = useState<number>();

    const handleDonate = async () => {
        if (!amount || amount < 100) return;

        const res = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount, project }),
        });

        const data = await res.json();
        const stripe = await loadStripe(
            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );

        stripe?.redirectToCheckout({ sessionId: data.id });
    };

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!id) return;

            setIsLoading(true);
            const { data, error } = await supabase
                .from("regions")
                .select("*")
                .eq("id", parseInt(id))
                .single();

            if (error) {
                console.log("Error fetching project data:", error);
            } else {
                setProject(data);
            }
            setIsLoading(false);
        };

        fetchProjectData();
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    if (!project) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Project Not Found
                    </h2>
                </div>
            </div>
        );
    }

    const progress = Math.round(
        (project.raised_amount / project.goal_amount) * 100
    );
    const formatCurrency = (amount: number) => {
        return `₹${amount.toLocaleString("en-IN")}`;
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-10">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                            <img
                                src={project.image_url}
                                alt={project.funding_purpose}
                                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <div className="flex items-center text-sm text-gray-200 mb-3">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {project.area}, {project.district},{" "}
                                    {project.state}
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                                    {project.funding_purpose}
                                </h1>
                                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                                    <span
                                        className={`w-2 h-2 rounded-full mr-2 ${
                                            project.active
                                                ? "bg-green-400"
                                                : "bg-red-400"
                                        }`}
                                    ></span>
                                    {project.active
                                        ? "Active Campaign"
                                        : "Completed Campaign"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-green-50">
                                <Target className="h-6 w-6 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                About This Project
                            </h2>
                        </div>
                        <div className=" p-4 rounded-2xl border border-gray-100 ">
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {project.long_description}
                            </p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 rounded-full bg-green-50">
                                <IndianRupee className="h-6 w-6 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Cost Breakdown
                            </h2>
                        </div>
                        <div className="p-6 rounded-2xl border border-gray-100">
                            {project.cost_breakdown.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-2 gap-10 hover:bg-gray-50 rounded-lg"
                                >
                                    <span className="text-gray-700 ">
                                        {item.item}
                                    </span>
                                    <span className="font-bold text-green-500">
                                        {formatCurrency(item.amount)}
                                    </span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center p-5 mt-6 bg-green-50 rounded-xl border border-green-100">
                                <span className="text-lg font-bold text-gray-900">
                                    Total Project Cost
                                </span>
                                <span className="text-xl font-bold text-green-600">
                                    {formatCurrency(project.goal_amount)}
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 rounded-full bg-green-50">
                                <Phone className="h-6 w-6 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Get In Touch
                            </h2>
                        </div>
                        <div className="p-6 rounded-2xl border border-gray-100">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-start space-x-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="p-2 rounded-full bg-green-50">
                                        <Users className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {project.contact_person_name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Project Lead
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="p-2 rounded-full bg-green-50">
                                        <Mail className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <a
                                            href={`mailto:${project.contact_person_email}`}
                                            className="font-medium text-gray-900 hover:text-green-700 transition-colors"
                                        >
                                            {project.contact_person_email}
                                        </a>
                                        <p className="text-sm text-gray-500">
                                            Email Address
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="p-2 rounded-full bg-green-50">
                                        <Phone className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <a
                                            href={`tel:${project.contact_person_phone}`}
                                            className="font-medium text-gray-900 hover:text-green-700 transition-colors"
                                        >
                                            +91 {project.contact_person_phone}
                                        </a>
                                        <p className="text-sm text-gray-500">
                                            Phone Number
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="space-y-6">
                        <div className="flex items-center space-x-3 ">
                            <div className="p-2 rounded-full bg-green-50">
                                <HandHelping className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Support This Project
                                </h2>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <TrendingUp className="h-4 w-4" />
                                                <span className="text-sm font-medium">
                                                    Raised
                                                </span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {formatCurrency(
                                                    project.raised_amount
                                                )}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Target className="h-4 w-4" />
                                                <span className="text-sm font-medium">
                                                    Goal
                                                </span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {formatCurrency(
                                                    project.goal_amount
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-full transition-all duration-700 ease-out shadow-sm"
                                                style={{
                                                    width: `${Math.min(
                                                        progress,
                                                        100
                                                    )}%`,
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <span className="inline-flex items-baseline gap-1">
                                                <span className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                                    {progress}%
                                                </span>
                                                <span className="text-lg text-gray-500 font-medium">
                                                    complete
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Quick Donate
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {fixedAmounts.map((amount) => (
                                            <button
                                                key={amount}
                                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 transition-all duration-300 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                                                onClick={() =>
                                                    setAmount(amount)
                                                }
                                            >
                                                <div className="p-4 flex items-center gap-2">
                                                    <div className="p-2 rounded-full bg-gray-100 group-hover:bg-emerald-100 transition-colors duration-300">
                                                        <Heart className="h-4 w-4 text-gray-500 group-hover:text-emerald-600 transition-colors duration-300" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors duration-300">
                                                        {formatCurrency(amount)}
                                                    </span>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Custom Amount (Min. ₹100)
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                                                <span className="text-gray-500 font-semibold text-lg">
                                                    ₹
                                                </span>
                                            </div>
                                            <Input
                                                type="number"
                                                value={amount}
                                                onChange={(e) =>
                                                    setAmount(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                                placeholder="Enter amount"
                                                className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all"
                                                min="100"
                                            />
                                        </div>
                                        <Button
                                            className="w-full py-6 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-2xl transform hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                                            disabled={!amount || amount < 100}
                                            onClick={handleDonate}
                                        >
                                            <div className="flex items-center justify-center gap-3">
                                                <Heart
                                                    className="h-5 w-5 group-hover:scale-110 transition-transform"
                                                    fill="currentColor"
                                                />
                                                <span>
                                                    {amount && amount >= 100
                                                        ? `Donate ${formatCurrency(
                                                              amount
                                                          )}`
                                                        : "Enter amount to donate"}
                                                </span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Details;
