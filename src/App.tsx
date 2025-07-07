import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import SupportRegionPage from "./pages/SupportRegionPage";
import ImpactPage from "./pages/ImpactPage";

const App = () => {
    return (
        <div className="px-8 md:px-20 lg:px-40">
            <Navbar />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route
                    path="/needs-your-support"
                    element={<SupportRegionPage />}
                />
                <Route path="/impact" element={<ImpactPage />} />
            </Routes>
        </div>
    );
};

export default App;
