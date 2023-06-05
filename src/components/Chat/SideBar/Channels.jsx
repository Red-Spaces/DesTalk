import React, { useEffect, useState } from "react";

import { TbMessages } from "react-icons/tb";
import { Button, Typography } from "antd";
import dbOperations from "../db";

const Channels = ({ setChannelId, channelId }) => {
  const [channels, setChannels] = useState([]);
  const { getChannels } = dbOperations;

  useEffect(() => {
    const fetchChannels = async () => {
      const channels = await getChannels();
      setChannels(channels);
    };
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
          <Typography className="text-purple_lighter text-ellipsis overflow-hidden">
            {channel.name}
          </Typography>
        </Button>
      ))}
    </div>
  );
};

export default Channels;
