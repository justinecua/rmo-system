import { useState } from "react";

const ExpandableText = ({ text }) => {
  const [showFull, setShowFull] = useState(false);
  const limit = 150;

  if (text.length <= limit) {
    return <p className="text-sm mt-3 w-full text-justify">{text}</p>;
  }

  const displayText = showFull ? text : text.slice(0, limit) + "...";

  return (
    <p className="text-sm mt-3 w-full text-justify whitespace-pre-wrap text-gray-700">
      {displayText}
      <button
        onClick={() => setShowFull(!showFull)}
        className="ml-1 text-md font-medium cursor-pointer"
      >
        {showFull ? "Read less" : "Read more"}
      </button>
    </p>
  );
};

export default ExpandableText;
