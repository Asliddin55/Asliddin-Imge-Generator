import { NextResponse } from 'next/server';
import { Leap } from '@leap-ai/sdk';

export async function GET(request: Request) {
  const apiKey = process.env.LEAP_API_KEY as string;
  const leap = new Leap(apiKey);

  const { data, error } = await leap.generate.listInferenceJobs({
    modelId: 'le_defd7ea3_T0YEsIUodMp2yLwp0V0r7RPK', // Model for OpenJourney v4
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
