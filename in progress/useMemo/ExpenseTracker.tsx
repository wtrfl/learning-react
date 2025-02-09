
import sample from './sample_data.json'

// todo: add master project data json

const categories = {
    shopping: {
        name: "Shopping",
        description: "something you bought",
        color: 'bg-red-300',
        icon: '🛍️'
    },
    food: {
        name: "Dining Out",
        description: "restuarant or fast food",
        color: 'bg-yellow-300',
        icon: '🍽️'
    },
    entertainment: {
        name: "Entertainment",
        description: "an experience or subscription",
        color: 'bg-orange-300',
        icon: '🍿'
    },
    necessity: {
        name: "Necessities",
        description: "something you need, like groceries or gas",
        color: 'bg-green-300',
        icon: '🏠'
    },
    bills: {
        name: "Bills",
        description: "a bill or utility",
        color: 'bg-purple-400',
        icon: '🧾'
    }
}

interface Expense {
    id: string,
    name: string,
    amount: number,
    category: 'shopping' | 'food' | 'bills' | 'necessity' | 'entertainment',
}

export default function ExpenseTracker() {

    const total = sample.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)

    const categoryTotals = sample.reduce((accumulator, currentValue) => {accumulator[currentValue.category] = (accumulator[currentValue.category] || 0) + currentValue.amount; return accumulator;}, {})

    return (
        <div className="w-full h-full flex bg-gray-50 justify-center items-center">
            <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-300 h-[90%] aspect-[9/16]">
                <span className="text-md text-center">Expense Tracker</span>
                <span className="text-[36pt] my-10 text-center">${total}</span>
                <Breakdown categories={categories} categoryTotals={categoryTotals} total={total} />
                <div className="flex flex-col flex-grow overflow-auto">
                    {sample.map(expense => (
                        <div className="flex items-center mb-4 gap-2">
                            <div className={`p-2 rounded-md text-xl ${categories[expense.category].color}`} style={{textShadow: '1px 1px 2px gray'}}>{categories[expense.category].icon}</div>
                            <span className='flex-grow'>{expense.name}</span>
                            <span className='font-semibold'>${expense.amount.toFixed(2)}</span>
                        </div>
                    ))}

                    {sample.length == 0 && <span className="text-sm text-gray-400 text-center mt-[100px]">No expenses yet!</span>}
                </div>
                <button
                    className="bg-blue-500 text-white rounded-md border border-b-2 border-blue-200 py-2 cursor-pointer hover:bg-blue-600 active:bg-blue-700 active:border-b-1 active:border-t-2"
                >+ New Expense</button>
            </div>
        </div>
    )
}

function Breakdown({ categories, categoryTotals, total }) {
    return (
        <div className="w-full h-3 bg-gray-200 mb-4 overflow-hidden flex">
            {Object.keys(categoryTotals).map(category => (
                <div className={categories[category].color} style={{width: categoryTotals[category]/total*100+'%', height: '100%'}}></div>
            ))}
        </div>
    )
}

function ExpenseItem({{  }})