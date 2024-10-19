import { getQuestions } from "@/lib/server/question-service";

export async function GET(req: Request, res: Response) {
  const questions = await getQuestions();
  return new Response(JSON.stringify(questions));
}