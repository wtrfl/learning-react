
import { useState, useMemo, memo } from "react";

type Tab = 'All' | 'Active' | 'Completed'

interface Todo {
    id: number,
    name: string,
    done: boolean
}

const todos: Todo[] = createTodos(15);

export default function ExpensiveSort() {
    return (
        <div className="w-full h-full flex bg-gray-50 justify-center items-center gap-2 relative">
            <span className="block absolute top-30 text-lg text-red-700">Filtered list calculation is artifically slowed down by 500ms.</span>
            <span className="block absolute top-36 font-light">Changing to dark mode will not be slow if the function is memoized, since it does not recalculate.</span>
            <MemoizedExample />
            <UnoptimizedExample />
        </div>
    )
}

function MemoizedExample() {

    const [tab, setTab] = useState<Tab>('All')
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const visibleTodos: Todo[] = useMemo(
        () => filterTodos(tab),
        [tab]
    )

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-300 min-w-[400px]">
            <span className="text-center text-lg font-semibold">Memoized Example</span>
            <TabSwitcher activeTab={tab} setTab={setTab} />
            <label htmlFor="themeSwitcher" className="select-none self-center">
                <input
                    type="checkbox"
                    id="themeSwitcher"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="mr-2"
                />
                Dark Mode
            </label>
            <div className={darkMode ? 'bg-black text-white' : 'bg-white text-black'}>
                <List items={visibleTodos} />
            </div>
        </div>
    )
}

function UnoptimizedExample() {

    const [tab, setTab] = useState<Tab>('All')
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const visibleTodos: Todo[] = filterTodos(tab);

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-300 min-w-[400px]">
            <span className="text-center text-lg font-semibold">Unoptimized Example</span>
            <TabSwitcher activeTab={tab} setTab={setTab} />
            <label htmlFor="themeSwitcher2" className="select-none self-center">
                <input
                    type="checkbox"
                    id="themeSwitcher2"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="mr-2"
                />
                Dark Mode
            </label>
            <div className={darkMode ? 'bg-black text-white' : 'bg-white text-black'}>
                <List items={visibleTodos} />
            </div>
        </div>
    )
}

interface TabSwitcherProps { activeTab: Tab, setTab: (arg: Tab) => void }
function TabSwitcher({ activeTab, setTab }: TabSwitcherProps) {
    const tabs: Tab[] = ['All', 'Active', 'Completed']
    return (
        <div className="flex gap-1 my-2">
            {tabs.map(tab => {
                if (tab === activeTab) return (
                    <div key={tab} className="flex-1 text-sm bg-blue-400 text-white text-center font-semibold py-1 rounded-2xl transition-all">{tab}</div>
                )

                return (
                    <div
                        key={tab}
                        className="flex-1 text-sm bg-gray-200 text-gray-600 text-center py-1 cursor-pointer rounded-2xl transition-all"
                        onClick={() => setTab(tab)}
                    >{tab}</div>
                )
            })}
        </div>
    )
}

const List = memo(function List({ items }: { items: Todo[] }) {
    
    console.log('Rendering artifially slowed down list...');
    let startTime = performance.now();
    while (performance.now() - startTime < 500) {
        // Do nothing for 500 ms to emulate extremely slow code
    }

    return (
        <ul className="list-disc ml-5">
            {items.map(item => (
                <li key={item.id} className={item.done ? 'line-through' : ''}>{item.name}</li>
            ))}
        </ul>
    )
})

function createTodos(count: number) {
    const todos: Todo[] = [];
    for (let i=1; i<count+1; i++) {
        todos.push({
            id: i,
            name: 'Todo '+i,
            done: Math.random() > 0.5
        })
    }
    return todos;
}

function filterTodos(tab: Tab) {
    return todos.filter(todo => {
        if (tab==='All') return true
        if (tab==='Active') return !todo.done
        if (tab==='Completed') return todo.done
        return false;
    })
}