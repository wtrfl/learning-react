
export default function HomePage() {

    return (
        <div className="w-full h-full m-0 flex flex-col">
            <div className="w-full flex justify-between px-4">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg mr-2">WARZYLAND</span>
                    {["Home", "Residents ⌄", "Investors ⌄", "About"].map(item => (
                        <span className="px-2 py-4 hover:bg-gray-300 cursor-pointer">{item}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button className="py-2 px-4 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-500">Contact us</button>
                    <button className="py-2 px-4 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700 font-semibold text-white">Dashboard</button>
                </div>
            </div>
            <div className="flex flex-grow justify-center items-center gap-4">
                <div className="flex flex-col gap-4">
                    <span className="text-[24pt] w-[400px]">We are building the city of dreams.</span>
                    <span className="w-[350px] text-gray-800 font-light">
                        We're setting a new standard for urban living designed to maximize quality of life—where vibrant third spaces, essential services, and world-class transit are all within a beautiful 7-minute walk.
                        <br /><br /><div className="inline-block bg-blue-400 px-1 text-white text-sm font-semibold rounded-sm">NEW</div> Early investors have a chance to shape the future. We are now offering exclusive incentives for landowners who invest in Phase 1. Secure your place in a city built for the future.
                    </span>
                    <div className="flex gap-2 items-center mt-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Join Us</button>
                        <span>Read our story {'➔'}</span>
                    </div>
                </div>
                <img src="futuristic_city.png" className="w-[500px] rounded" />
            </div>
        </div>
    )
}