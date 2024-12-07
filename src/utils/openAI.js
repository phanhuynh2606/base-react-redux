import { OpenAI } from "openai";

const openai = new OpenAI({
  dangerouslyAllowBrowser: true
});

const translateText = async (text, targetLang) => {
  const prompt = `Translate the following text to ${targetLang}: "${text}"`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
          role: "user",
          content: "Write a haiku about recursion in programming.",
      },
  ],
  });
  console.log(response.choices[0].message);
  return response.data.choices[0].text.trim();
};

export default translateText;
