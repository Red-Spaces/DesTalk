import React, { useState } from "react";
import { Modal, Typography, Input, Button } from "antd";
import { getItem, setItem } from "../../utils/localStorage";
import { API_KEY_NAME } from "../../constants";

const { Title, Text } = Typography;

const ApiKeyModal = ({ isModalOpen, setIsModalOpen }) => {
  const [apiKey, setApiKey] = useState(getItem(API_KEY_NAME) || "");

  const handleOk = () => {
    setItem(API_KEY_NAME, apiKey);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    if (!apiKey) {
      return setIsModalOpen(true);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setItem(API_KEY_NAME, "");
    window.location.reload();
  };

  return (
    <Modal
      className="modal-style"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          className="border border-1 rounded-lg text-purple_lighter border-purple_darker"
          danger
          onClick={handleDelete}
          disabled={!apiKey}
        >
          Delete
        </Button>,
        <Button
          key="submit"
          onClick={handleOk}
          disabled={!apiKey}
          className="border border-1 rounded-lg text-purple_lighter border-purple_darker"
        >
          Submit
        </Button>,
      ]}
    >
      <div className="space-y-2">
        <Title level={3}>Set OpenAI API key</Title>
        <Text>
          You can get the API key{" "}
          <a
            href="https://platform.openai.com/account/api-keys"
            target="_blank noopener noreferrer"
          >
            here
          </a>
          .
        </Text>
        <div className="border border-purple_darker rounded-md">
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API key"
            type="password"
            bordered={false}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ApiKeyModal;
