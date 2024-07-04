import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { emailBody } = req.body;

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Customize the following email body: ${emailBody}`,
          },
        ],
      });

      const customizedEmail = chatCompletion.choices[0].message.content.trim();
      res.status(200).json({ customizedEmail });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
