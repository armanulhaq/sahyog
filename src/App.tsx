import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import SupportRegionPage from "./pages/SupportRegionPage";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Details from "./pages/Details";
import Success from "./pages/Success";
import PaymentFailed from "./pages/Failed";
import MyDonations from "./pages/MyDonations";

const App = () => {
    return (
        <>
            <Navbar />
            <div className="pt-4 md:pt-8 xl:pt-10 px-4 md:px-20 xl:px-40">
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route
                        path="/needs-your-support"
                        element={<SupportRegionPage />}
                    />
                    <Route path="/my-donations" element={<MyDonations />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/project/:id" element={<Details />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<PaymentFailed />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
