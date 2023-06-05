import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "antd";
import SideBarButton from "../../Common/SideBarButton";

const Header = ({ setChannelId, setShowSidebar, showSidebar }) => (
  <div className="flex space-x-2 m-2">
    <Button
      type="secondary"
      className="border border-1 rounded-lg text-purple_lighter border-purple_dark w-5/6 hover:bg-purple_dark"
      onClick={() => setChannelId(null)}
    >
      + New chat
    </Button>
    <SideBarButton setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
  </div>
);

export default Header;
