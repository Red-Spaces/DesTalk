import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "antd";

const SideBarButton = ({ setShowSidebar, showSidebar }) => (
  <Button
    type="secondary"
    className="border border-1 rounded-lg text-purple_lighter border-purple_dark hover:bg-purple_dark z-50"
    onClick={() => setShowSidebar(!showSidebar)}
  >
    <AiOutlineMenu />
  </Button>
);

export default SideBarButton;
