import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const Footer = ({ message, setMessage, isLoading, errorMessage }) => {
  const sendMessage = async (e) => {
    e.preventDefault();
  };

  const handleKeypress = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };
  return (
    <div className="absolute bottom-0 left-0 w-full pt-2">
      <form className="stretch mx-2 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="h-full  ">
          <div className="bg-purple_dark rounded-md border border-purple_darker">
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={(e) => sendMessage(e)}
              onKeyDown={handleKeypress}
              placeholder="Send a message."
              autoSize={{ minRows: 1, maxRows: 5 }}
              bordered={false}
              className="m-0 w-full resize-none border-0 bg-transparent p-2 text-purple_lighter"
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
