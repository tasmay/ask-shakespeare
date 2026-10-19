import { NextRequest, NextResponse } from 'next/server';
import weaviate from 'weaviate-client'

export async function GET(request: NextRequest) {
    let client;
    try {
      const searchParams = request.nextUrl.searchParams;
      const query = searchParams.get('query');

      if (!query) {
        return NextResponse.json({ error: "Query parameter is required." }, { status: 400 });
      }

      client = await weaviate.connectToWeaviateCloud(
        process.env.WEAVIATE_INSTANCE_URL!,
        {
          authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
          headers: {
            'X-Studio-Api-Key': process.env.GEMINI_API_KEY!,
            'X-Goog-Studio-Api-Key': process.env.GEMINI_API_KEY!,
          }
        }
      )

      const recipes = client.collections.get('Recipes');

      const prompt = `Write the recipe instructions: {instructions} as a Shakespearean poem.`
      
      const result = await recipes.generate.nearText(query.toString(),
        { singlePrompt: prompt },
        { limit: 1 }
      )

      if (!result.objects || result.objects.length === 0) {
        return NextResponse.json({ error: "No matching recipes found." }, { status: 404 });
      }

      const first = result.objects[0]

      const recipe = {
        title: first.properties.title,
        ingredients: first.properties.ingredients,
        instructions: first.properties.instructions,
        poem: first.generated,
      }

      return NextResponse.json({ recipe }, { status: 200 })
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
    } finally {
        if (client) {
          await client.close();
        }
    }
  }