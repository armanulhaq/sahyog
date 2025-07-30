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
import type { User } from "@supabase/supabase-js";

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
    const [stripeLoading, setStripeLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const fixedAmounts = [1000, 10000, 100000];

    const [amount, setAmount] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    const handleDonate = async () => {
        setStripeLoading(true);
        const numericAmount = parseInt(amount);
        if (!numericAmount || numericAmount < 100) return;

        const res = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount, project }),
        });

        const data = await res.json();

        localStorage.setItem("donatedProject", JSON.stringify(project)); //Saving the project we are donating
        localStorage.setItem("user_id", JSON.stringify(user?.id));
        localStorage.setItem("amount", JSON.stringify(amount));

        const stripe = await loadStripe(
            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        setStripeLoading(false);
        stripe?.redirectToCheckout({ sessionId: data.id });
    };

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!id) return;

            setIsLoading(true);
            const { data, error } = await supabase
                .from("projects")
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
    }, [id]); //any value that can change should be in the dependency array here id can change

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

    const formatCurrency = (amount: number) => {
        return `₹${amount.toLocaleString("en-IN")}`;
    };

    return (
        <div className="min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 xl:gap-9 pb-5">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="relative group overflow-hidden rounded-lg">
                            <img
                                src={project.image_url}
                                alt={project.funding_purpose}
                                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 md:p-8 p-4 text-white">
                                <div className="flex items-center text-xs md:text-sm text-gray-200 mb-3">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {project.area}, {project.district},{" "}
                                    {project.state}
                                </div>
                                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2">
                                    {project.funding_purpose}
                                </h1>
                                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/20">
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

                    <section className="xl:space-y-6 space-y-3">
                        <div className="flex items-center">
                            <div className="p-2 rounded-full bg-green-50">
                                <Target className="h-6 w-6 text-green-600" />
                            </div>
                            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-gray-900">
                                About This Project
                            </h2>
                        </div>
                        <div className="p-6 rounded-md border border-gray-100 ">
                            <p className="text-gray-600/80 leading-relaxed text-sm md:text-md xl:text-lg">
                                {project.long_description}
                            </p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center space-x-3 xl:mb-6 mb-3">
                            <div className="p-2 rounded-full bg-green-50">
                                <IndianRupee className="h-6 w-6 text-green-600" />
                            </div>
                            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-gray-900">
                                Cost Breakdown
                            </h2>
                        </div>
                        <div className="p-4 rounded-lg border border-gray-100 text-sm md:text-md xl:text-lg">
                            {project.cost_breakdown.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-2 gap-10 hover:bg-gray-50 rounded-lg"
                                >
                                    <span className="text-gray-600/80 ">
                                        {item.item}
                                    </span>
                                    <span className="font-bold text-green-500">
                                        {formatCurrency(item.amount)}
                                    </span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center px-2 mt-3 rounded-xl text-sm md:text-md xl:text-lg">
                                <span className="font-bold text-gray-900/70">
                                    Total Project Cost
                                </span>
                                <span className="font-bold text-green-600">
                                    {formatCurrency(project.goal_amount)}
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 rounded-full bg-green-50">
                                <Phone className="h-6 w-6 text-green-600" />
                            </div>
                            <h2 className="xl:text-2xl md:text-xl text-lg font-semibold text-gray-900">
                                Get In Touch
                            </h2>
                        </div>
                        <div className="p-4 rounded-lg border border-gray-100">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-start space-x-3 py-2 hover:bg-gray-50 rounded-xl  text-sm md:text-md xl:text-lg">
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
                                <div className="flex items-start space-x-3 py-2 hover:bg-gray-50 rounded-xl text-sm md:text-md xl:text-lg">
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
                                        <p className="text-sm text-gray-500/90">
                                            Email Address
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 py-2 hover:bg-gray-50 rounded-xl text-sm md:text-md xl:text-lg">
                                    <div className="p-2 rounded-full bg-green-50/90">
                                        <Phone className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <a
                                            href={`tel:${project.contact_person_phone}`}
                                            className="font-medium text-gray-900 hover:text-green-700 transition-colors"
                                        >
                                            +91 {project.contact_person_phone}
                                        </a>
                                        <p className="text-sm text-gray-500/90">
                                            Phone Number
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-3 my-5">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-green-50">
                                <HandHelping className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="text-center">
                                <h2 className="md:text-2xl text-xl font-bold text-gray-900 mb-2">
                                    Support This Project
                                </h2>
                            </div>
                        </div>
                        <div className="rounded-xl bg-green-50 border border-gray-100">
                            <div className="p-6">
                                <div className="space-y-3">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                                <Target className="h-4 w-4 text-green-600" />
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
                                </div>
                            </div>

                            <div className="px-6 py-4 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Quick Donate
                                    </h3>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                        {fixedAmounts.map((amount) => (
                                            <button
                                                key={amount}
                                                className="rounded-md text-sm text-gray-600/90 font-semibold cursor-pointer"
                                                onClick={() =>
                                                    setAmount(amount.toString())
                                                }
                                            >
                                                <div className="xl:p-4 p-2 flex items-center gap-2 bg-green-200 rounded-md">
                                                    <div className="p-1">
                                                        <Heart className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm ">
                                                        {formatCurrency(amount)}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="xl:text-lg text-md font-semibold text-gray-900">
                                        Custom Amount (Min. ₹100)
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                                                <span className="text-gray-500 font-semibold text-md">
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
                                                        ).toString() || ""
                                                    )
                                                }
                                                placeholder="Enter amount"
                                                className="pl-8 pr-4 py-6 text-md rounded-md border-1  w-fit border-gray-400"
                                                min="100"
                                            />
                                        </div>
                                        <Button
                                            className="py-6 w-full xl:text-lg text-md font-semibold bg-green-600 hover:bg-green-700 text-white rounded-sm cursor-pointer"
                                            disabled={
                                                stripeLoading ||
                                                !amount ||
                                                parseInt(amount) < 100
                                            }
                                            onClick={handleDonate}
                                        >
                                            {stripeLoading ? (
                                                <div className="flex justify-center items-center">
                                                    <svg
                                                        className="animate-spin h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-3">
                                                    <Heart className="h-5 w-5" />
                                                    <span>
                                                        {amount &&
                                                        parseInt(amount) >= 100
                                                            ? `Donate ${formatCurrency(
                                                                  parseInt(
                                                                      amount
                                                                  )
                                                              )}`
                                                            : "Enter amount to donate"}
                                                    </span>
                                                </div>
                                            )}
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
