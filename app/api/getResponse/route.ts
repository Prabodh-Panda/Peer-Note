import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { base64string } = body;

    if (!base64string || typeof base64string !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing base64string field" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                inline_data: {
                  mime_type: "application/pdf",
                  data: base64string,
                },
              },
              {
                text: "For the given pdf generate the subject, the tags and a brief summary making sure the accuracy of the content and making sure that the summary covers all the content of the pdf.",
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              summary: {
                type: "string",
              },
              tags: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              subject: {
                type: "string",
              },
            },
            required: ["summary", "tags", "subject"],
          },
        },
      }
    );

    const data = response.data.candidates[0].content.parts[0].text;
    if (!data) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Response generated",
        data: response.data.candidates[0].content.parts[0].text,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling the POST request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
