import weaviate, { WeaviateClient } from 'weaviate-client';
import dotenv from 'dotenv';
import * as fs from "fs";

dotenv.config()

async function main() {
    const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
        process.env.WEAVIATE_INSTANCE_URL!, {
        authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
        headers: {
            "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!
        }
      }
    )
    console.log("Connected to weaviate client.")

    // Delete collection if it already exists
    await client.collections.delete('Recipes')
    console.log("Deleted existing collection.")

    // Define the 'Recipes' schema
    const recipesObj = {
      name: 'Recipes',
      properties: [
        {
          name: 'title',
          dataType: 'text' as const,
          description: 'Title of the recipe' as const,
          tokenization: 'lowercase' as const,
          vectorizePropertyName: true,
    
        },
        {
          name: 'ingredients',
          dataType: 'text[]' as const,
          description: 'List of ingredients used in the recipe',
          tokenization: 'whitespace' as const,
          vectorizePropertyName: false,
        },
        {
          name: 'instructions',
          dataType: 'text' as const,
          description: 'The complete directions to make the recipe',
          tokenization: 'whitespace' as const,
          vectorizePropertyName: false,
        },
        {
          name: 'picture_link',
          dataType: 'text' as const,
          description: 'The picture of the dish',
          tokenization: 'whitespace' as const,
          vectorizePropertyName: false,
        }
      ],
      vectorizers: weaviate.configure.vectorizer.text2VecOpenAI(),
      generative: weaviate.configure.generative.openAI()
    }
    
    // Add the class to the schema
    const newCollection = await client.collections.create(recipesObj)
    console.log("Successfully created new collection.")

    // Read JSON file
    const jsonString = fs.readFileSync('./data/recipes.json', 'utf-8');
    const data = await JSON.parse(jsonString);
    const dataArray = Object.keys(data).map(k => data[k]);
    
    // Upload data objects to Weaviate Cloud
    const recipes = client.collections.get('Recipes');
    const batchSize = 1000;
    for (let i = 0; i < dataArray.length; i += batchSize) {
        const batch = dataArray.slice(i, i + batchSize);
        try {
          const response = await recipes.data.insertMany(batch);
          console.log('Batch inserted successfully', response);
        } catch (error) {
          console.error('Error inserting batch:', error);
        }
    }

    console.log("Data imported from json file to Weaviate.")
}
  
main().catch((err) => console.error(err))