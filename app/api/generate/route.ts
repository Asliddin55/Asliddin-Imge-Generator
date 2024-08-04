import { NextResponse } from 'next/server';
import { Leap } from '@leap-ai/sdk';

export async function POST(request: Request) {
  const res = await request.json();
  const prompt = res.prompt;

  const apiKey = process.env.LEAP_API_KEY as string;

  if (!prompt || !prompt.length) {
    return NextResponse.json(
      { error: 'Invalid request. Check key and prompt.' },
      { status: 400 }
    );
  }

  // List of pre-trained models: https://docs.tryleap.ai/reference/pre-trained-models
  // Model: OpenJourney v4
  const modelId = 'le_defd7ea3_T0YEsIUodMp2yLwp0V0r7RPK';
  const imageWidth = 512;
  const imageHeight = 512;
  const numberOfImages = 1;

  const leap = new Leap(apiKey);
  const { data, error } = await leap.generate.generateImage({
    modelId,
    prompt,
    numberOfImages,
    width: imageWidth,
    height: imageHeight,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // console.log('Your prompt', prompt);
  return NextResponse.json({ data }, { status: 200 });
}
