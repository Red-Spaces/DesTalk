import React from "react";

import { TbMessages } from "react-icons/tb";
import { Button, Typography } from "antd";

const Channels = () => {
  const channels = [
    "The sun sets in the west, painting the sky with hues of orange and pink.",
    "She walked along the sandy beach, feeling the gentle breeze in her hair.",
    "The old oak tree stood tall and majestic, its branches reaching towards the sky.",
    "The aroma of freshly brewed coffee filled the air, awakening my senses.",
    "He gazed at the stars, mesmerized by their beauty and the vastness of the universe.",
    "The sound of waves crashing against the shore created a soothing melody.",
    "The city buzzed with life as people hurriedly went about their day.",
    "In the distance, a rainbow appeared, stretching across the horizon.",
    "The laughter of children echoed through the park on a sunny afternoon.",
    "As the rain poured, she danced with joy, embracing the moment.",
    "In the distance, a rainbow appeared, stretching across the horizon.",
    "The laughter of children echoed through the park on a sunny afternoon.",
    "As the rain poured, she danced with joy, embracing the moment.",
  ];

  return (
    <div className="m-2 space-y-2 overflow-hidden">
      {channels.map((channel, index) => (
        // <div
        //   key={index}
        //   className="border rounded-lg border-purple_dark cursor-pointer hover:bg-purple_dark"
        // >
        //   <div className="line-clamp-1 py-1 px-2 flex">
        //     <TbMessages className="w-48" />
        //     {channel}
        //   </div>
        // </div>
        <Button
          key={index}
          type="secondary"
          className="border flex border-1 rounded-lg text-purple_lighter border-purple_dark w-full hover:bg-purple_dark"
          icon={<TbMessages size="14" />}
        >
          <Typography className="text-purple_lighter text-ellipsis overflow-hidden">
            {channel}
          </Typography>
        </Button>
      ))}
    </div>
  );
};

export default Channels;
