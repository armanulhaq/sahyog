const Loader = () => {
    return (
        <div className="min-h-screen">
            <div className="flex justify-center items-center h-[70vh]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-green-400 rounded-full animate-spin animate-reverse"></div>
                    </div>
                    <p className="text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        </div>
    );
};

export default Loader;
