import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import Loader from "@/components/Loader";

const MyDonations = () => {
    const [donations, setDonations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("donations")
                .select(
                    "id, created_at, amount, project:project_id(funding_purpose)"
                )
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching donations:", error);
                setDonations([]);
            } else {
                setDonations(data || []);
            }

            setLoading(false);
        };

        fetchDonations();
    }, []);

    if (loading) return <Loader />;

    if (donations.length === 0)
        return (
            <div className="text-center text-green-500 mt-10 text-lg">
                You haven't made any donations yet.
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto p-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your Donations
            </h2>
            <div className="space-y-4">
                {donations.map((donation) => (
                    <div
                        key={donation.id}
                        className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex justify-between items-center"
                    >
                        <div>
                            <p className="text-lg font-semibold text-gray-800">
                                {donation.project?.funding_purpose ||
                                    "Unknown Project"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Donated on{" "}
                                {new Date(
                                    donation.created_at
                                ).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                        <div className="text-green-600 font-bold text-lg">
                            ₹{donation.amount.toLocaleString("en-IN")}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyDonations;
