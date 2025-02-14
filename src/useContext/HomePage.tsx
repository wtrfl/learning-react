import { useState } from 'react'

export default function HomePage() {

    const [theme, setTheme] = useState<Boolean>(false);

    return (
        <div className="w-full h-full m-0 flex flex-col">
            <div className="w-full flex justify-between">
                <div className="flex items-center">
                    <span className="font-semibold text-lg">WARZYLAND</span>
                    {["Home", "About", "Contact"].map(item => (
                        <span className="px-2 py-4 hover:bg-gray-300 cursor-pointer">{item}</span>
                    ))}
                </div>
                <div className="flex items-center">
                    <button className="px-2 py-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-500" onClick={() => setTheme(!theme)}>{theme ? 'Light' : 'Dark'} Mode</button>
                    <button className="px-2 py-1 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700">Log in</button>
                </div>
            </div>
            <div className="flex flex-grow justify-center items-center">
                <div className="flex flex-col">
                    <span className="text-2xl">We are building the city of dreams.</span>
                    <span className="w-[300px] text-gray-800 font-light">
                        Third spaces, equal opportunity social services, robust mass transit systems, and daily essentials, all within a gorgeous 7 minute* walk.
                        <br /><br /><div className="inline-block bg-blue-500 px-1 text-white font-semibold">NEW</div> We are now offering subsidies to land-owners who invest early.
                    </span>
                    <div className="flex gap-2">
                        <button>Join Us</button>
                        <span>Read our story {'->'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}