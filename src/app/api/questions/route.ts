import { NextResponse } from 'next/server';
import { loadQuestionsFromCSV } from '@/lib/server/question-service';

export async function GET(request: Request) {
  const questions = await loadQuestionsFromCSV();
  return NextResponse.json(questions);
}