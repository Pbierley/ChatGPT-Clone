import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsSend, BsMic, BsMicFill } from "react-icons/bs";
import { AiOutlinePaperClip, AiOutlineClose, AiOutlineFile } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import { addMessage, sendConversationMessage, DEFAULT_MODEL } from "../dashboardSlice";
import ChatSettings from "./ChatSettings.jsx";
import { extractTextFromFile } from "../../services/fileExtractor";
import { startListening, stopListening, canListen } from "../../services/speechService";

const NewMessageInput = () => {
  const [content, setContent] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [extracting, setExtracting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef(null);
  const interimRef = useRef('');

  const dispatch = useDispatch();

  const selectedConversationId = useSelector(
    (state) => state.dashboard.selectedConversationId
  );
  const conversations = useSelector((state) => state.dashboard.conversations);
  const loading = useSelector((state) => state.dashboard.loading);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  // Stop listening if the conversation changes
  useEffect(() => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    }
  }, [selectedConversationId]);

  // Clean up on unmount
  useEffect(() => () => stopListening(), []);

  const toggleListening = () => {
    if (!canListen()) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    if (isListening) {
      stopListening();
      setIsListening(false);
      interimRef.current = '';
      return;
    }

    const baseContent = content;
    interimRef.current = '';
    setIsListening(true);

    startListening({
      onInterim: (text) => {
        interimRef.current = text;
        setContent(baseContent ? `${baseContent} ${text}` : text);
      },
      onFinal: (text) => {
        interimRef.current = '';
        setContent(baseContent ? `${baseContent} ${text}` : text);
      },
      onEnd: () => {
        interimRef.current = '';
        setIsListening(false);
      },
      onError: (err) => {
        console.error('[STT]', err);
        setIsListening(false);
      },
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    setExtracting(true);
    try {
      const text = await extractTextFromFile(file);
      setAttachedFile({ name: file.name, text });
    } catch (err) {
      alert(err.message);
    } finally {
      setExtracting(false);
    }
  };

  const removeAttachment = () => setAttachedFile(null);

  const proceedMessage = () => {
    if (isListening) { stopListening(); setIsListening(false); }

    const userText = content.trim();
    const conversationId = selectedConversationId;

    let fullContent = userText;
    if (attachedFile) {
      const fileHeader = `[File: ${attachedFile.name}]\n${attachedFile.text}`;
      fullContent = userText ? `${fileHeader}\n\n---\n\n${userText}` : fileHeader;
    }

    const message = {
      aiMessage: false,
      content: fullContent,
      userText: userText || null,
      fileName: attachedFile?.name || null,
      id: uuid(),
    };

    const conversation = conversations.find(c => c.id === conversationId);
    const conversationMessages = conversation ? conversation.messages : [];
    const model = selectedConversation?.model || DEFAULT_MODEL;
    const persona = selectedConversation?.persona || '';

    dispatch(addMessage({ conversationId, message }));
    dispatch(sendConversationMessage({ message, conversationId, conversationMessages, model, persona }));

    setContent("");
    setAttachedFile(null);
  };

  const canSend = (content.trim().length > 0 || attachedFile) && !loading && !extracting;

  const handleSendMessage = () => { if (canSend) proceedMessage(); };
  const handleKeyPressed = (e) => { if (e.code === "Enter" && canSend) proceedMessage(); };

  const micDisabled = loading || extracting;

  return (
    <div className="new_message_input_container">
      <ChatSettings />

      <div className="new_message_input_wrapper">
        {attachedFile && (
          <div className="file_attachment_chip">
            <AiOutlineFile size={13} />
            <span className="file_attachment_name">{attachedFile.name}</span>
            <button className="file_attachment_remove" onClick={removeAttachment} type="button">
              <AiOutlineClose size={11} />
            </button>
          </div>
        )}
        <div className="new_message_input_row">
          <input
            className="new_message_input"
            placeholder={
              extracting ? "Reading file…"
              : isListening ? "Listening…"
              : loading ? "Waiting for response..."
              : attachedFile ? "Ask something about the file…"
              : "Send a message..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyPressed}
            disabled={loading || extracting}
          />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,application/pdf,text/plain"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <button
        className="file_upload_button"
        onClick={() => fileInputRef.current?.click()}
        disabled={micDisabled}
        type="button"
        title="Attach a PDF or TXT file"
      >
        <AiOutlinePaperClip color={micDisabled ? "lightgrey" : "grey"} size={18} />
      </button>

      <button
        className={`mic_button${isListening ? ' mic_button--listening' : ''}`}
        onClick={toggleListening}
        disabled={micDisabled}
        type="button"
        title={isListening ? "Stop listening" : "Speak your message"}
      >
        {isListening
          ? <BsMicFill color="#ef4444" size={16} />
          : <BsMic color={micDisabled ? "lightgrey" : "grey"} size={16} />}
      </button>

      <div className="new_message_icon_container" onClick={handleSendMessage}>
        <BsSend color={canSend ? "grey" : "lightgrey"} />
      </div>
    </div>
  );
};

export default NewMessageInput;
