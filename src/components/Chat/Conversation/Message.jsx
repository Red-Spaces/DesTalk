import { SiOpenai } from "react-icons/si";
import { HiUser } from "react-icons/hi";
import { TbCursorText } from "react-icons/tb";
import ReactMarkdown from "react-markdown";

const Message = ({ message = {}, isLoading = false }) => {
  const { role, content: text } = message;

  const isUser = role === "user";

  return (
    <div
      className={`group w-full border-b border-purple_darker ${
        isUser ? "bg-purple_darker" : "bg-purple_dark"
      }`}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
        <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
          <div className="w-8 flex flex-col relative items-end">
            {!isUser || isLoading ? (
              <div className="relative h-7 w-7 p-1 rounded-sm flex items-center justify-center bg-purple_darker text-opacity-100r">
                <SiOpenai className="h-4 w-4" />
              </div>
            ) : (
              <div className="relative h-7 w-7 p-1 rounded-sm flex items-center justify-center bg-purple_dark text-opacity-100r">
                <HiUser className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
            <div className="flex flex-grow flex-col gap-3">
              <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                <div className="w-full break-words">
                  {isLoading ? (
                    <TbCursorText className="h-6 w-6 animate-pulse" />
                  ) : (
                    <ReactMarkdown>{text}</ReactMarkdown>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
