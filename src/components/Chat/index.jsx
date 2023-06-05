import React, { useState } from "react";
import SideBar from "./SideBar";
import Conversation from "./Conversation";
import ApiKeyModal from "../Common/ApiKeyModal";
import { getItem } from "../../utils/localStorage";
import { API_KEY_NAME } from "../../constants";
import Landing from "../Common/Landing";

const Chat = () => {
  const apiKey = getItem(API_KEY_NAME);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(!apiKey);
  const [showSidebar, setShowSidebar] = useState(true);
  const [channelId, setChannelId] = useState(null);

  if (!apiKey) {
    return <Landing />;
  }

  return (
    <div className="flex h-screen w-full bg-purple_darker text-purple_lighter">
      <SideBar
        isModalOpen={isApiKeyModalOpen}
        setIsModalOpen={setIsApiKeyModalOpen}
        setChannelId={setChannelId}
        channelId={channelId}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Conversation
        channelId={channelId}
        setChannelId={setChannelId}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
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
