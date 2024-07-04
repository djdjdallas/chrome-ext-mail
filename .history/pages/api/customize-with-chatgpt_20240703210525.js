import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have this environment variable set
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { emailBody } = req.body;

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Customize the following email body: ${emailBody}`,
        max_tokens: 200,
      });

      const customizedEmail = completion.data.choices[0].text.trim();
      res.status(200).json({ customizedEmail });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
