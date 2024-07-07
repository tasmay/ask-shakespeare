
# Ask Shakespeare

Ask Shakespeare is a just-for-fun tool that performs near text queries against a large corpus of recipes and retrieves the result in the form of a Shakespearean poem. This project is built on the [Next.js](https://nextjs.org/) framework and uses [Weaviate](https://weaviate.io/) as the backend database.

## Overview

This project uses Weaviate's Generative Search feature. The Weaviate database already consists a large corpus of recipes data with the following properties, see example below:

```
{
    "instructions": "Toss ingredients lightly and spoon into a buttered baking dish. Top with additional crushed...",
    "ingredients": [
      "1/2 cup celery, finely chopped",
      "1 small green pepper finely chopped",
      "1/2 cup finely sliced green onions",
      "1/4 cup chopped parsley",
      "1 pound crabmeat",
      "1 1/4 cups coarsely crushed cracker crumbs",
      "1/2 teaspoon salt",
      "3/4 teaspoons dry mustard",
      "Dash hot sauce",
      "1/4 cup heavy cream",
      "1/2 cup melted butter"
    ],
    "title": "Grammie Hamblet's Deviled Crab",
    "picture_link": null
},
```

The frontend allows the users to input a single query, e.g. "chicken and cheese recipes". The backend comprises of a single API endpoint `/api/search` that accepts a URL param `?query=chicken%20cheese%20recipes`.

The API endpoint then performs a generative search on the data. Generative search, also known as "Retrieval Augmented Generation" (RAG), is a multi-stage process. First Weaviate performs a "near teaxt" query, then it passes the retrieved results and a prompt to a large language model (LLM), to generate a new output.

```
const recipes = client.collections.get('Recipes');

const prompt = `Write the recipe instructions: {instructions} as a Shakespearean poem.`
      
const result = await recipes.generate.nearText(query!.toString(),
    { singlePrompt: prompt },
    { limit: 1 }
)
```

In this case, we ask the LLM to translate the retrieved recipe instructions into a Shakespearean poem!

## Demo

This project is deployed at [foo](https://bar.vercel.app/). Try it out online!

https://github.com/tasmay/ask-shakespeare/assets/3182990/2d14c723-97a9-4cf3-9f6f-f6b3ea87e633

## Screenshots

![image](/img/landing-page.png)
![image](/img/search-results-1.png)
![image](/img/search-results-2.png)


## Getting Started

Follow the steps below to get started. Install the project:

```
npm install
```

### Weaviate Cloud Setup 

You first need a Weaviate Cloud account. Go to the [WCD quickstart guide](https://weaviate.io/developers/wcs/quickstart) and follow the instructions to create a sandbox instance. Note down the API Key and sandbox instance URL, you will need it later in the project.


### Environment Variables

Add the following environment variables to your .env file. See .env.example for reference.

`WEAVIATE_INSTANCE_URL`

`WEAVIATE_API_KEY`

`OPENAI_API_KEY`


### Open AI Setup

This project uses the GPT-3.5 Turbo LLM. For that you will need an Open AI API key. You can get that after creating an account with [OpenAI](https://platform.openai.com/). 

If you do not wish to use OpenAI, you can use any of the several model providers integrated with Weaviate. See [here](https://weaviate.io/developers/weaviate/model-providers).

To configure a different model provider, add its API key to .env file. Then, in the project replace the 'headers' property in the Weaviate client connection request with your model provider's API key. For example, to use Hugging Face models, you would modify the code as follows:

```
const client = await weaviate.connectToWeaviateCloud(
    process.env.WEAVIATE_INSTANCE_URL!,
    {
        authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
        headers: {
        "'X-HuggingFace-Api-Key'": process.env.YOUR_MODEL_PROVIDER_API_KEY!
        }
    }
)
```

### Import Data

Data is provided in data/recipes.json file. You can import it to your WCD cluster via the lib/import.ts script. Run the script with the following command:

```bash
npx tsx app/lib/import.ts
```

### Run the Project

After data is imported successfully, start the project locally:

```
npm run dev
```

Access the application on http://localhost:3000/

## Documentation

- [Weaviate Documentation](https://weaviate.io/developers/weaviate)
- [Next.js Documentation](https://nextjs.org/docs)
