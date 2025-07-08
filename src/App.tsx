import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import SupportRegionPage from "./pages/SupportRegionPage";
import ImpactPage from "./pages/ImpactPage";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

const App = () => {
    return (
        <>
            <Navbar />
            <div className="pt-20 px-8 md:px-20 lg:px-40">
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route
                        path="/needs-your-support"
                        element={<SupportRegionPage />}
                    />
                    <Route path="/impact" element={<ImpactPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
