import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { Button } from "antd";
import SideBarButton from "../../Common/SideBarButton";

const Header = ({ setChannelId, setShowSidebar, showSidebar }) => (
  <div className="flex space-x-2 m-2">
    <Button
      type="secondary"
      className="border border-1 rounded-lg text-purple_lighter border-purple_dark w-5/6 hover:bg-purple_dark"
      onClick={() => setChannelId(null)}
    >
      <div className="flex">
        <FiPlus className="h-5 w-5 mr-2" /> <>New chat</>
      </div>
    </Button>
    <SideBarButton setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
  </div>
);

export default Header;
