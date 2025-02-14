import { useState } from 'react'

export default function HomePage() {

    const [theme, setTheme] = useState<Boolean>(false);

    return (
        <div className="w-full h-full m-0 flex flex-col">
            <div className="w-full flex justify-between px-4">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg mr-2">WARZYLAND</span>
                    {["Home", "About", "Contact"].map(item => (
                        <span className="px-2 py-4 hover:bg-gray-300 cursor-pointer">{item}</span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button className="py-2 px-4 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-500" onClick={() => setTheme(!theme)}>{theme ? 'Light' : 'Dark'} Mode</button>
                    <button className="py-2 px-4 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700 font-semibold text-white">Log in</button>
                </div>
            </div>
            <div className="flex flex-grow justify-center items-center">
                <div className="flex flex-col gap-1">
                    <span className="text-2xl">We are building the city of dreams.</span>
                    <span className="w-[300px] text-gray-800 font-light">
                        Third spaces, equal opportunity social services, robust mass transit systems, and daily essentials, all within a gorgeous 7 minute* walk.
                        <br /><br /><div className="inline-block bg-blue-500 px-2 text-white text-sm font-semibold rounded-sm">NEW</div> We are now offering subsidies to land-owners who invest early.
                    </span>
                    <div className="flex gap-2 items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Join Us</button>
                        <span>Read our story {'->'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}