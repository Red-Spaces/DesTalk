import React, { useState } from "react";
import SideBar from "./SideBar";
import Conversation from "./Conversation";
import ApiKeyModal from "../Common/ApiKeyModal";
import { getItem } from "../../utils/localStorage";
import { API_KEY_NAME } from "../../constants";

const Chat = () => {
  const apiKey = getItem(API_KEY_NAME);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(!apiKey);

  return (
    <div className="flex h-screen w-full bg-purple_darker text-purple_lighter">
      <SideBar
        isModalOpen={isApiKeyModalOpen}
        setIsModalOpen={setIsApiKeyModalOpen}
      />
      <Conversation />
      {isApiKeyModalOpen && (
        <ApiKeyModal
          isModalOpen={isApiKeyModalOpen}
          setIsModalOpen={setIsApiKeyModalOpen}
        />
      )}
    </div>
  );
};

export default Chat;
