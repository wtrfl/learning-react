import { useMemo, useState } from "react"

type Data = { name: string, amount: number }[]

const sample: Data = [
    { name: 'Coal', amount: 42 },
    { name: 'Iron', amount: 53 },
    { name: 'Gold', amount: 12 },
    { name: 'Diamond', amount: 5 },
    { name: 'Netherite', amount: 16 },
]

export default function Sums() {

    const [ data, setData ] = useState<Data>(sample);

    const [ newSectionOpen, setNewSectionOpen ] = useState<boolean>(false);

    const [ nameBox, setNameBox ] = useState<string>("");
    const [ amountBox, setAmountBox ] = useState<string>("");

    const [ error, setError ] = useState<false | string>(false);

    const [ italic, setItalic ] = useState<boolean>(false);

    const handleDelete = () => {
        setNameBox("")
        setAmountBox("")
        setError(false);
        setNewSectionOpen(false);
    }

    const handleAdd = () => {
        console.log("adding",nameBox,+amountBox)
        setError(false);

        if (nameBox.trim() === "") {
            setError("Item needs a name!");
            return;
        }

        if (isNaN(+amountBox)) {
            setError("Please enter a valid number!")
            return;
        }

        const line = { name: nameBox, amount: +amountBox }
        
        setNameBox("")
        setAmountBox("")
        setNewSectionOpen(false);
        setData([...data, line])
    }

    const sum = useMemo(() => {
        let time = performance.now();
        while (performance.now() - time < 500) { /* do nothing */ }
        return data.reduce((acc, cur) => acc + cur.amount, 0)
    }, [data])

    return (
        <div className="w-full h-full flex flex-col gap-2 bg-gray-50 justify-center items-center">
            <div className="flex flex-col gap-1 p-6 bg-white rounded-lg border border-gray-300 w-[400px]">
                <span className="text-xl">Optimzing with useMemo</span>
                <span className="text-gray-600 text-sm">The sum calculation is artificially delayed. If you add a new line, it will take one second to update. However, flipping the switch below will make everything italic but should not rerun the calculation because it has been memoized.</span>
            </div>
            <div className={`flex flex-col gap-1 p-6 bg-white rounded-lg border border-gray-300 min-w-[400px] ${italic ? 'italic' : ''}`}>
                <div className="flex gap-2 justify-center">Italicized <Toggle italic={italic} setItalic={setItalic} /></div>
                {data.map(line => (
                    <div className="flex">
                        <span className="flex-grow">{line.name}</span>
                        <span>{line.amount}</span>
                    </div>
                ))}
                {!newSectionOpen && (
                    <button
                        className="border border-dashed rounded-lg text-lg cursor-pointer hover:border-solid hover:font-bold active:bg-gray-100"
                        onClick={() => setNewSectionOpen(true)}
                    >+</button>
                )}
                {newSectionOpen && (
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                            <input
                                type="text"
                                className="border rounded-md px-2 py-1 flex-grow"
                                placeholder="Emeralds"
                                autoFocus
                                onChange={(e) => setNameBox(e.target.value)}
                            />
                            <input
                                type="text"
                                className="border rounded-md px-2 py-1 w-20 text-right"
                                placeholder="11"
                                onChange={(e) => setAmountBox(e.target.value)}
                            />
                        </div>
                        {error && <span className="text-red-500">{error}</span>}
                        <div className="flex gap-1">
                            <button 
                                className="flex-grow bg-gray-200 rounded-md px-2 py-1 cursor-pointer hover:brightness-90"
                                onClick={handleDelete}
                            >Delete</button>
                            <button 
                                className="flex-grow bg-black text-white rounded-md px-2 py-1 cursor-pointer hover:bg-gray-800"
                                onClick={handleAdd}
                            >Add</button>
                        </div>
                    </div>
                )}
                <hr className="mt-1 mb-0.5" />
                <div className="flex items-end">
                    <span className="flex-grow">Total</span>
                    <span className="text-lg font-semibold">{sum}</span>
                </div>
            </div>
        </div>
    )
}

type ToggleProps = { italic: boolean, setItalic: (arg0: boolean) => void}

function Toggle({ italic, setItalic }: ToggleProps) {
    return (
        <div className={`flex w-8 p-0.5 rounded-full self-center bg-gray-300 cursor-pointer ${italic ? 'justify-end' : 'justify-start'}`} onClick={() => setItalic(!italic)}>
            <div className="size-3 bg-black rounded-full"></div>
        </div>
    )
}