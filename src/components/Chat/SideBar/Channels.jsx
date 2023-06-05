import React, { useEffect, useState } from "react";

import { TbMessages } from "react-icons/tb";
import { FiDelete } from "react-icons/fi";
import { Button, Typography } from "antd";
import dbOperations from "../db";
import DeleteButton from "./DeleteButton";

const Channels = ({ setChannelId, channelId }) => {
  const [channels, setChannels] = useState([]);
  const { getChannels } = dbOperations;

  const fetchChannels = async () => {
    const channels = await getChannels();
    setChannels(channels);
  };
  useEffect(() => {
    fetchChannels();
  });

  return (
    <div className="m-2 space-y-2 overflow-hidden">
      {channels.map((channel) => (
        <Button
          key={channel.id}
          type="secondary"
          className={`border flex border-1 rounded-lg text-purple_lighter border-purple_dark w-full hover:bg-purple_dark ${
            channel.id === channelId && "bg-purple_dark"
          }`}
          icon={<TbMessages size="14" className="mt-1" />}
          onClick={() => setChannelId(channel.id)}
        >
          <div className="w-3/4 text-left">
            <Typography className="text-purple_lighter text-ellipsis overflow-hidden">
              {channel.name}
            </Typography>
          </div>
          <DeleteButton channelId={channel.id} fetchChannels={fetchChannels} />
        </Button>
      ))}
    </div>
  );
};

export default Channels;
