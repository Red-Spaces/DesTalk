import React from "react";

import { Button } from "antd";

const Footer = ({ isModalOpen, setIsModalOpen }) => (
  <div className="m-2">
    <Button
      type="secondary"
      className="border border-1 rounded-lg text-purple_lighter border-purple_dark w-full hover:bg-purple_dark"
      onClick={() => setIsModalOpen(!isModalOpen)}
    >
      Update API Key
    </Button>
  </div>
);

export default Footer;
