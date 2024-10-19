import { NextResponse } from 'next/server';
import { getQuestions } from '@/lib/server/question-service';

export async function GET(request: Request) {
  const questions = getQuestions();
  return NextResponse.json(questions);
}