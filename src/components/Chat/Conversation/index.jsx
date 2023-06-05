import { useEffect, useRef, useState } from "react";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Footer from "./Footer";
import NewChat from "./NewChat";

import Message from "./Message";
import dbOperations from "../db";
import { scrollToBottom } from "./utils";
import SideBarButton from "../../Common/SideBarButton";

const Conversation = ({
  channelId,
  setChannelId,
  showSidebar,
  setShowSidebar,
}) => {
  const bottomOfChatRef = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [sanitizedConversation, setSanitizedConversation] = useState([]);
  const [message, setMessage] = useState("");
  const { getMessagesByChannel } = dbOperations;

  const selectedModel = {
    name: "GPT-4",
    id: "gpt-4",
    available: false,
  };

  useEffect(() => {
    if (shouldScrollToBottom) {
      if (bottomOfChatRef.current) {
        scrollToBottom(bottomOfChatRef);
      }
      setShouldScrollToBottom(false);
    }
  }, [
    shouldScrollToBottom,
    bottomOfChatRef.current,
    isLoadingResponse,
    sanitizedConversation,
  ]);

  const sanitizeConversation = (messages) => {
    const sanitizedMessages = [];
    messages.forEach((message) => {
      const role = message.user ? "user" : "system";
      const sanitizedMessage = { content: message.message, role: role };
      sanitizedMessages.push(sanitizedMessage);
    });
    setSanitizedConversation(sanitizedMessages);
    setShouldScrollToBottom(true);
  };

  const fetchMessages = async (id) => {
    const messages = await getMessagesByChannel(id);
    sanitizeConversation(messages);
  };

  useEffect(() => {
    if (channelId) {
      fetchMessages(channelId);
    } else {
      sanitizedConversation.length !== 0 && setSanitizedConversation([]);
    }
  }, [channelId]);

  return (
    <div className="relative h-full flex flex-col overflow-hidden w-full">
      {!showSidebar && (
        <div className="m-2">
          <SideBarButton
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
          />
        </div>
      )}
      <div className="overflow-scroll h-full">
        {!channelId ? (
          <NewChat />
        ) : (
          <div className="flex flex-col items-center text-sm">
            {sanitizedConversation.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            {isLoadingResponse && <Message isLoading={true} />}
            <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
          </div>
        )}
        <div ref={bottomOfChatRef}></div>
      </div>
      <Footer
        message={message}
        setMessage={setMessage}
        channelId={channelId}
        setChannelId={setChannelId}
        sanitizedConversation={sanitizedConversation}
        setSanitizedConversation={setSanitizedConversation}
        setIsLoadingResponse={setIsLoadingResponse}
        isLoadingResponse={isLoadingResponse}
        fetchMessages={fetchMessages}
      />
    </div>
  );
};

export default Conversation;
