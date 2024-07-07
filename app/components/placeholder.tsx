export interface PlaceholderProps {
    handleInput: (inputText: string) => void;
}

const exampleQueries = [
    'Chicken and cheese recipes',
    'Quick mocktails',
    'Turkey sandwich',
    'Casserole',
]

export default function Placeholder({handleInput}: PlaceholderProps) {

    const handleClick = (e: React.MouseEvent<HTMLElement>, inputText: string) => {
        e.preventDefault()
        handleInput(inputText)
    }

    return(
        <div className="h-96 p-4 bg-transparent text-gray-900">
          <p className="text-gray-900">{`\"Ask Shakespeare\" uses near text queries to look for recipes matching the search criteria. It then translates the recipe into a beautiful Shakespearean poem!`}</p>
          <p>Example queries to try:</p>
          <div className="mx-3 mt-6 flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
            <div className="flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                {exampleQueries.map((q, i) => (
                    <button key={`q-${i}`} onClick={(e) => handleClick(e, q.toLowerCase())} className="relative flex w-40 flex-col gap-2 rounded-2xl bg-white border border-slate-300 px-3 pb-4 pt-3 text-xs text-center align-top shadow-lg transition hover:bg-slate-100">
                        {q}
                    </button>
                ))}
                </div>
            </div>
          </div>
        </div>
    );
}