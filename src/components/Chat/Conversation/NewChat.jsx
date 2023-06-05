import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const NewChat = () => (
  <div className="relative w-full flex flex-col h-full">
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-1">
          <Text className="text-purple_lighter text-2xl text-center">
            Welcome to DesTalk
          </Text>
          <Text className="text-purple_lighter text-center">
            An alternative to ChatGPT Plus
          </Text>
        </div>
        <div className="border rounded-xl border-purple_dark">
          <ul className="p-2">
            <li>Uses GPT-4</li>
            <li>Use your own API key</li>
            <li>Conversations are stored locally</li>
            <li>Higher availability depending on OpenAI api</li>
            <li>Pay only for what for usage unlike ChatGPT Plus</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default NewChat;
