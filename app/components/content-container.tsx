'use client';
import { useState } from 'react'
import RecipeCard from './recipe-card';
import Error from './error';
import Spinner from './spinner';
import Placeholder from './placeholder';

export interface Recipe {
    title: string;
    ingredients: string[];
    instructions: string;
    poem: string;
}

export default function ContentContainer() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [input, setInput] = useState<string>("")

  const searchSync = (formData: FormData) => {
    setRecipe(null)
    setLoading(true);
    setError(false);

    const query = formData.get("query")?.toString()

    search(query!).then(result => {
      setRecipe(result.recipe);
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setLoading(false);
    })
  }

  const search = async (query: string) => {
    const res = await fetch(`/api/search?query=${query}`, {
      method: "GET",
      headers: {
          'Accept': 'application/json',
      },
    });
    if (res.status === 200)
      return await res.json();
    else throw error
  }

  const handleInput = (inputText: string) => {
    setInput(inputText)
  }

    return(
        <div className="flex flex-col overflow-auto w-full h-full items-center pb-10">
          <form action={searchSync} className="w-full max-w-2xl mx-auto">   
            <label htmlFor="query" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="query" name="query" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-700 focus:border-purple-700" placeholder="Search using keywords..." defaultValue={input} required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-darkpurple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-700 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
          </form>
          <div className="w-full max-w-2xl mx-auto pt-4">
            { error && <> <Error message="Something went wrong."></Error> </> }
            {loading ?
              <>
                <Spinner></Spinner>
              </>
            :
              <>
                { recipe? <RecipeCard recipe={recipe!}></RecipeCard> 
                : 
                <Placeholder handleInput={handleInput}></Placeholder> 
                }
              </>
            }
          </div>
        </div>
    );
}