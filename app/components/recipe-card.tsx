import { useState } from "react";

export interface Recipe {
    title: string;
    ingredients: string[];
    instructions: string;
    poem: string;
}

export default function RecipeCard({ recipe } : { recipe: Recipe }) {
    const [poemOn, setPoemOn] = useState(true)
    return (
        <div className="p-4 overflow-y-auto bg-white rounded-md text-sm text-gray-900">
            <div className="flex space-x-1 rounded-lg p-0.5 w-36 border h-10">
                <div className="relative w-full h-full flex items-center text-xs font-sans">
                    <button
                        className={`flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 w-full justify-center text-gray-500 cursor-pointer ${poemOn ? 'bg-darkpurple text-white shadow' : 'hover:bg-slate-100'}`} 
                        onClick={() => setPoemOn(!poemOn)}
                    >
                    Poem
                    </button>
                        <button 
                        className={`flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 w-full justify-center text-gray-500 cursor-pointer ${!poemOn ? 'bg-darkpurple text-white shadow' : 'hover:bg-slate-100'} `}
                        onClick={() => setPoemOn(!poemOn)}
                    >
                    Recipe
                    </button>
                </div>
            </div>
            <div className="pt-2">
                {poemOn ? 
                    <>
                    <div>
                    <article className="prose">
                        <h3 className="text-center">{recipe.title}</h3>
                        <p className="text-center whitespace-pre-line">{recipe.poem}</p>
                    </article>
                    </div>
                    </>
                :
                    <>
                    <article className="prose">
                        <h3 className="text-center">{recipe.title}</h3>
                        <p>{recipe.ingredients.map((ing) => (
                            <li key={ing}>{`${ing}`}</li>
                            ))
                        }</p>
                        <p>{recipe.instructions}</p>
                    </article>
                    </>
                }
            </div>
        </div>
    )
}