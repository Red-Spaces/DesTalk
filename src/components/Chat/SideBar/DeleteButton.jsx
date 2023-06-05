import React, { useState } from "react";
import { FiDelete, FiCheck } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Button } from "antd";
import dbOperations from "../db";
import { toast } from "react-toastify";

const DeleteButton = ({ channelId, fetchChannels }) => {
  const [deleteChannel, setDeleteChannel] = useState(false);
  const { deleteChannel: deleteConversation } = dbOperations;

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteConversation(channelId);
      fetchChannels();
    } catch (err) {
      toast.error("Error deleting channel");
    }
    setDeleteChannel(!deleteChannel);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setDeleteChannel(!deleteChannel);
  };

  if (deleteChannel) {
    return (
      <div className="flex -space-x-3 absolute right-0">
        <Button
          className="text-purple_lighter"
          size="small"
          type="text"
          onClick={handleDelete}
        >
          <FiCheck size="14" className="mb-1" />
        </Button>
        <Button
          className="text-purple_lighter"
          size="small"
          type="text"
          onClick={handleCancel}
        >
          <IoMdClose size="14" className="mb-1" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      className="absolute right-0 text-purple_lighter"
      size="small"
      type="text"
      onClick={(e) => {
        e.stopPropagation();
        setDeleteChannel(!deleteChannel);
      }}
    >
      <FiDelete size="14" className="mb-1" />
    </Button>
  );
};

export default DeleteButton;
