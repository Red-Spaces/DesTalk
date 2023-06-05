import { Configuration, OpenAIApi } from "openai";
import { toast } from "react-toastify";
import { getItem } from "../../utils/localStorage";
import { API_KEY_NAME } from "../../constants";
import dbOperations from "./db";

const configuration = new Configuration({
  apiKey: getItem(API_KEY_NAME),
});
const openai = new OpenAIApi(configuration);
const { insertMessage } = dbOperations;

const getCompletion = async (messages, channelId) => {
  try {
    const initialPrompt = {
      role: "system",
      content: "You are ChatGPT. Respond to the user like you normally would.",
    };
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [initialPrompt, ...messages],
    });
    const completionText = completion.data.choices[0].message.content;
    await insertMessage(channelId, completionText, false);
    return completionText;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

const gpt = {
  getCompletion,
};

export default gpt;
