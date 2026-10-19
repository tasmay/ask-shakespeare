import weaviate, { WeaviateClient } from 'weaviate-client';
import dotenv from 'dotenv';
import * as fs from "fs";

dotenv.config()

async function main() {
    const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
        process.env.WEAVIATE_INSTANCE_URL!, {
        authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
        headers: {
            "X-Studio-Api-Key": process.env.GEMINI_API_KEY!,
            "X-Goog-Studio-Api-Key": process.env.GEMINI_API_KEY!,
        }
      }
    )
    console.log("Connected to weaviate client.")

    // Delete collection if it already exists
    const exists = await client.collections.exists('Recipes');
    if (exists) {
      await client.collections.delete('Recipes')
      console.log("Deleted existing collection.")
    }

    // Define the 'Recipes' schema with Google Gemini vectorizer and generative modules
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
      vectorizers: weaviate.configure.vectorizer.text2VecGoogle({
        apiEndpoint: 'generativelanguage.googleapis.com',
        model: 'gemini-embedding-001',
      }),
      generative: weaviate.configure.generative.google({
        apiEndpoint: 'generativelanguage.googleapis.com',
        model: 'gemini-3.5-flash-lite',
      })
    }
    
    // Add the class to the schema
    await client.collections.create(recipesObj)
    console.log("Successfully created new Recipes collection with Gemini.")

    // Read JSON file
    console.log("Reading data/recipes.json...")
    const jsonString = fs.readFileSync('./data/recipes.json', 'utf-8');
    const data = JSON.parse(jsonString);
    const dataArray = Object.keys(data).map(k => data[k]);
    console.log(`Loaded ${dataArray.length} recipes from file.`)
    
    // Upload data objects to Weaviate Cloud
    const recipes = client.collections.get('Recipes');
    const batchSize = 1000;
    for (let i = 0; i < dataArray.length; i += batchSize) {
        const batch = dataArray.slice(i, i + batchSize);
        try {
          const response = await recipes.data.insertMany(batch);
          if (response.hasErrors) {
            const errorKeys = Object.keys(response.errors);
            console.error(`Batch [${i}..${i + batch.length}] had ${errorKeys.length} errors.`);
          } else {
            console.log(`Batch inserted successfully: ${i + batch.length}/${dataArray.length}`);
          }
        } catch (error) {
          console.error(`Error inserting batch [${i}..${i + batch.length}]:`, error);
        }
    }

    console.log("Data imported from json file to Weaviate.")
    await client.close();
}
  
main().catch((err) => console.error(err))