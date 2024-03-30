const express = require("express");
const OpenAI = require("openai");
var cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ai/list-suggestion", async (req, res) => {
  const { task, lists } = req.body;

  if (!task || !lists || !Array.isArray(lists)) {
    return res.status(400).json({
      error: "Task and lists are required and lists must be an array.",
    });
  }

  try {
    const prompt = `Task: "${task}"\n\nExisting Buckets: ${lists.join(
      ", "
    )}\n\nSelect the right bucket for the task from the existing ones or suggest a new bucket name. Respond only with the bucket name, nothing else. No other prefix/postfix like "Bucket name:" should be there other than the bucket name.`;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      temperature: 0.4,
      max_tokens: 60,
      n: 1,
      stop: null,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const listName = response.choices[0].text.trim();
    res.json({ listName, isNewList: !lists.includes(listName) });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.post("/api/ai/list-guide", async (req, res) => {
  const { tasks, listName } = req.body;

  if (!tasks || !listName || !Array.isArray(tasks)) {
    return res.status(400).json({
      error: "Tasks and listName are required and tasks must be an array.",
    });
  }

  try {
    const prompt = `Given the following list of tasks: ${tasks.join(
      ", "
    )} for the list name: ${listName}. Provide a short(110 words maximum) and brief info on how to approach and complete these tasks efficiently.`;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      temperature: 0.4,
      max_tokens: 80,
      n: 1,
      stop: null,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const guideData = response.choices[0].text.trim();
    res.json({ guideData });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
