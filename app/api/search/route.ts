import { NextRequest, NextResponse } from 'next/server';
import weaviate from 'weaviate-client'

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const query = searchParams.get('query');

      const client = await weaviate.connectToWeaviateCloud(
        process.env.WEAVIATE_INSTANCE_URL!,
        {
          authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
          headers: {
            "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY!
          }
        }
      )
      const recipes = client.collections.get('Recipes');

      const prompt = `Write the recipe instructions: {instructions} as a Shakespearean poem.`
      
      const result = await recipes.generate.nearText(query!.toString(),
        { singlePrompt: prompt },
        { limit: 1 }
      )

      const first = result.objects[0]

      const recipe = {
        title: first.properties.title,
        ingredients: first.properties.ingredients,
        instructions: first.properties.instructions,
        poem: first.generated,
      }

      client.close();
      return NextResponse.json({ recipe }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
    }
  }