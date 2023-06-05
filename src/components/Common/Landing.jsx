import React, { useState } from "react";
import { Typography, Input, Button } from "antd";
import { API_KEY_NAME } from "../../constants";
import { setItem } from "../../utils/localStorage";
const { Text } = Typography;

const Landing = () => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    setItem(API_KEY_NAME, apiKey);
    window.location.reload();
  };

  return (
    <div className="bg-purple_darker h-screen">
      <div className="relative w-full flex flex-col h-full">
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col space-y-2">
            <Text className="text-purple_lighter text-4xl">Setup</Text>
            <Text className="text-purple_lighter">
              Enter your OpenAI API key. You can get it from{" "}
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
              >
                here
              </a>
              .
            </Text>
            <div className="border border-purple_darker bg-purple_dark rounded-md">
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key"
                type="password"
                bordered={false}
              />
            </div>
            <div className="flex">
              <Button
                key="submit"
                onClick={handleSubmit}
                disabled={!apiKey}
                type="secondary"
                className="bg-purple_dark hover:bg-purple_darker text-purple_lighter mx-auto"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
