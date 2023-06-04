import React from "react";
import Header from "./Header";
import Channels from "./Channels";
import Footer from "./Footer";

const SideBar = ({ isModalOpen, setIsModalOpen }) => (
  <div className="grid grid-rows-[auto,1fr,auto] h-screen w-p10 w mx-2 border-r border-purple_dark">
    <div className="border-b border-purple_dark">
      <Header />
    </div>
    <div className="h-full overflow-y-scroll">
      <Channels />
    </div>
    <div className="border-t border-purple_dark self-end">
      <Footer isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  </div>
);

export default SideBar;
