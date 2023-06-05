import React from "react";
import Header from "./Header";
import Channels from "./Channels";
import Footer from "./Footer";

const SideBar = ({
  isModalOpen,
  setIsModalOpen,
  channelId,
  setChannelId,
  showSidebar,
  setShowSidebar,
}) => (
  <div className="border-r border-purple_dark">
    <div
      className={`grid grid-rows-[auto,1fr,auto] w-p10 h-screen w mx-2  overflow-visible ${
        showSidebar ? "block" : "hidden"
      }`}
    >
      <div className="border-b border-purple_dark">
        <Header
          setChannelId={setChannelId}
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
      </div>
      <div className="h-full overflow-y-scroll">
        <Channels setChannelId={setChannelId} channelId={channelId} />
      </div>
      <div className="border-t border-purple_dark self-end">
        <Footer isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  </div>
);

export default SideBar;
