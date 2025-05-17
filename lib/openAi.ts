import { SUMMARY_SYSTEM_PROMPT } from "@/utils/openAiPrompt";
import OpenAI from "openai";
import { toast } from "sonner";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function generateSummaryOpenAi(pdftext: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      temperature: 0.7,
      max_tokens: 100,
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        { role: "user", content: `Transform this document into an engaging,easy to read summary with contextually relevant emojis and proper markdown formatting:\n\n  ${pdftext}` },
      ],
    });

    return completion.choices[0].message.content;
  } catch (err: any) {
    if (err.staus === 429) {
      toast.error("Rate limit exceeded. Please try again later for openai.");
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw new Error("Error generating summary: OPenAi " + err.message);
  }
}
