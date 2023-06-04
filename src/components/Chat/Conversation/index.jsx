import { useEffect, useRef, useState } from "react";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Footer from "./Footer";
import NewChat from "./NewChat";

import Message from "./Message";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("test");
  const [showEmptyChat, setShowEmptyChat] = useState(false);
  const bottomOfChatRef = useRef(null);
  const [conversation, setConversation] = useState([
    { role: "user", content: "Hello!" },
    { role: "system", content: "This is an example message." },
    { role: "user", content: "How are you?" },
    {
      role: "system",
      content:
        "Random content goes here.aschasjcasjdkhvbdkasjvbkdsjavbkjdsavbdskajvbdskjhvbdskajvhksdhajvbkjhdsabvkjdsvbkljdsabvdskjvbkdslajvbkajdhsvbdskj,vbksdjavblkdsjbvsadlkjvbdkasjvbsdkj",
    },
    { role: "user", content: "Lorem ipsum dolor sit amet." },
    { role: "user", content: "System message." },
    { role: "system", content: "Hello!" },
    { role: "user", content: "Random content goes here." },
    { role: "system", content: "How are you?" },
    { role: "system", content: "This is an example message." },
    { role: "user", content: "System message." },
    { role: "system", content: "Hello!" },
    { role: "user", content: "Random content goes here." },
    { role: "system", content: "How are you? `hjel`" },
    {
      role: "system",
      content: "This is an example message. \n```rb \nputs 'Hello world'\n```",
    },
  ]);
  const [message, setMessage] = useState("");

  const selectedModel = {
    name: "GPT-4",
    id: "gpt-4",
    available: false,
  };

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div className="relative h-full flex flex-col overflow-hidden w-11/12">
      <div className="overflow-scroll h-full">
        {!showEmptyChat && conversation.length > 0 && (
          <div className="flex flex-col items-center text-sm">
            {conversation.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
            <div ref={bottomOfChatRef}></div>
          </div>
        )}
        {showEmptyChat && <NewChat />}
      </div>
      <Footer
        message={message}
        setMessage={setMessage}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Chat;
