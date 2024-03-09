const OpenAI = require("openai");
require('dotenv').config();
const apiKey = process.env.OPEN_AI_API_KEY;
const openai = new OpenAI({apiKey: apiKey});

const test = async (req, res) => {
  try {
    console.log('got in OpenAI Test');
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Say Hi & give a 1 liner intro." }],
      model: "gpt-3.5-turbo",
    });

    console.log("res--> ", completion.choices[0]);
    
    res.status(200).json(completion.choices[0]);
  } catch (error) {
    console.error("error--> ", error);
    res.status(500).json({ error: `Internal Server Error`, moreInfo: `${error}` });
  }
}

module.exports = { test };
