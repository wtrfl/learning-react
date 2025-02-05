import { useReducer, useState } from "react";

// todo: fix tailwind config

interface Todo {
    id: string,
    name: string,
    done: boolean
}

interface ActionTemplate<T,P> {
    type: T,
    payload: P
}

type Action =
    ActionTemplate<'add', Todo>
    | ActionTemplate<'update', { id: string }>
    | ActionTemplate<'remove', { id: string } >

// state is provided by react
// action is { type: string, action }
const reducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        case 'add': {
            return [action.payload, ...state]
        }
        case 'remove': {
            return state.filter(todo => todo.id !== action.payload.id)
        }
        case 'update': {
            return state.map(todo => todo.id === action.payload.id ? {...todo, done: !todo.done} : todo)
        }
    }
}

export default function Todo() {

    const [data, update] = useReducer(reducer, [])
    const [field, setField] = useState('')

    const handleNewTodo = () => {
        if (field === '') return;
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            name: field,
            done: false
        }
        update({ type: 'add', payload: newTodo })
        setField('')
    }

    return (
        <div className="w-full h-full flex bg-gray-50 justify-center items-center">
            <div className="flex flex-col p-6 bg-white rounded-lg border border-gray-300 min-w-[400px]">
                <span className="text-center text-lg mb-6">Todo List using useReducer</span>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                        onKeyUp={(e) => { if (e.key==='Enter') handleNewTodo() }}
                        className="flex-grow px-3 py-1 border border-gray-400 rounded-md"
                        placeholder="take out the trash..."
                    />
                    <button onClick={handleNewTodo} className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition-all">Add</button>
                </div>
                <div className="flex flex-col min-h-[200px] max-h-[400px] overflow-y-auto">
                    {data.map(({name, done, id}: Todo) => (
                        <div
                            className="flex rounded-md hover:cursor-pointer hover:bg-gray-200 transition-all items-center gap-2 px-2 py-1 mt-0.5"
                            onClick={() => update({type: 'update', payload: { id } })}
                            key={id}
                        >
                            <div className="border rounded-full p-[2px] size-4">
                                {done && <div className="w-full h-full bg-black rounded-full" />}
                            </div>
                            <span className={`block flex-grow${done ? ' line-through text-gray-400' : ''}`}>{name}</span>
                            <button onClick={() => update({ type: 'remove', payload: { id } })} className="h-full pl-3 text-lg">&times;</button>
                        </div>
                    ))}
                    {data.length === 0 && <span className="mt-[85px] text-sm text-gray-400 text-center">No todos yet!</span>}
                </div>
                
            </div>
        </div>
    )

}