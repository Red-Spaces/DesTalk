import React from "react";
import { Input, Button } from "antd";
import dbOperations from "../db";
import { toast } from "react-toastify";
import gpt from "../useGPT";
import { FiSend } from "react-icons/fi";

const { TextArea } = Input;

const Footer = ({
  message,
  setMessage,
  channelId,
  setChannelId,
  sanitizedConversation,
  setSanitizedConversation,
  setIsLoadingResponse,
  isLoadingResponse,
  fetchMessages,
}) => {
  const { insertChannel, insertMessage } = dbOperations;
  const { getCompletion } = gpt;

  const sendMessage = async (e) => {
    e.preventDefault();
    setIsLoadingResponse(true);
    let id = channelId;
    if (message.trim() === "") return;
    if (!id) {
      try {
        id = await insertChannel(message.substring(0, 100));
        setChannelId(id);
      } catch (err) {
        toast.error("Error creating channel");
      }
    }
    const messages = [
      ...sanitizedConversation,
      { content: message, role: "user" },
    ];
    setSanitizedConversation(messages);
    setMessage("");
    try {
      await insertMessage(id, message, true);
      fetchMessages(id);
      const gptResponse = await getCompletion(messages, id);
      setSanitizedConversation([
        ...sanitizedConversation,
        { content: gptResponse, role: "system" },
      ]);
      fetchMessages(id);
    } catch (err) {
      toast.error("Error sending message");
    } finally {
      setIsLoadingResponse(false);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full pt-2">
      <form className="stretch mx-2 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="h-full">
          <div className="bg-purple_dark rounded-md border border-purple_darker flex">
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message."
              autoSize={{ minRows: 1, maxRows: 5 }}
              bordered={false}
              className="m-0 w-full resize-none border-0 bg-transparent p-2 text-purple_lighter"
              disabled={isLoadingResponse}
            />
            <Button
              disabled={isLoadingResponse || message?.trim().length === 0}
              onClick={sendMessage}
              type="text"
              className="mr-1"
              icon={
                <FiSend className="text-purple_lighter m-1 w-5 h-5 hover:text-purple_darker" />
              }
            />
          </div>
        </div>
      </form>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-purple_dark md:px-4 md:pt-3 md:pb-6">
        <span>AppGPT is powered by OpenAI's GPT API</span>
      </div>
    </div>
  );
};

export default Footer;
