import React, { useState, useRef, useEffect } from "react";
import { GrUser } from "react-icons/gr";
import { FcMindMap } from "react-icons/fc";
import { AiOutlineFile } from "react-icons/ai";
import { BsVolumeUp, BsVolumeMute } from "react-icons/bs";
import { speak, stopSpeaking, canSpeak } from "../../services/speechService";

const SlowText = ({ speed, text }) => {
  const [placeholder, setPlaceholder] = useState(text[0]);
  const index = useRef(0);

  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder((prev) => prev + text[index.current]);
    }
    if (index.current < text.length - 1) {
      const addChar = setInterval(tick, speed);
      return () => clearInterval(addChar);
    }
  }, [placeholder, speed, text]);

  return <span>{placeholder}</span>;
};

const Message = ({ content, userText, fileName, aiMessage, animate }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const displayText = fileName ? (userText || '') : content;

  // Stop speaking when this message unmounts
  useEffect(() => () => { if (isSpeaking) stopSpeaking(); }, [isSpeaking]);

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    if (!canSpeak() || !content) return;
    setIsSpeaking(true);
    speak(content, { onEnd: () => setIsSpeaking(false) });
  };

  return (
    <div
      className="message_container"
      style={{ background: aiMessage ? "rgb(247, 247, 248)" : "white" }}
    >
      <div className="message_avatar_container">
        {aiMessage ? <FcMindMap /> : <GrUser />}
      </div>
      <div className="message_text">
        {fileName && (
          <div className="message_file_chip">
            <AiOutlineFile size={13} />
            <span>{fileName}</span>
          </div>
        )}
        {displayText && (
          <p className="message_text_body">
            {animate ? <SlowText speed={20} text={displayText} /> : displayText}
          </p>
        )}
        {aiMessage && canSpeak() && (
          <button
            className={`speak_button${isSpeaking ? ' speak_button--active' : ''}`}
            onClick={handleSpeak}
            type="button"
            title={isSpeaking ? "Stop reading" : "Read aloud"}
          >
            {isSpeaking
              ? <BsVolumeMute size={14} />
              : <BsVolumeUp size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
