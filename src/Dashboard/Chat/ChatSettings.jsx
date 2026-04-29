import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  setConversationModel,
  setConversationPersona,
  AVAILABLE_MODELS,
  DEFAULT_MODEL,
} from "../dashboardSlice";

const ChatSettings = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef();
  const dispatch = useDispatch();

  const { conversations, selectedConversationId } = useSelector(s => s.dashboard);
  const conversation = conversations.find(c => c.id === selectedConversationId);
  const model = conversation?.model || DEFAULT_MODEL;
  const persona = conversation?.persona || '';

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleModelChange = (e) => {
    dispatch(setConversationModel({ conversationId: selectedConversationId, model: e.target.value }));
  };

  const handlePersonaChange = (e) => {
    dispatch(setConversationPersona({ conversationId: selectedConversationId, persona: e.target.value }));
  };

  return (
    <div className="chat_settings" ref={panelRef}>
      <button className="settings_button" onClick={() => setOpen(o => !o)} title="Chat settings">
        <RxHamburgerMenu size={18} color="grey" />
      </button>

      {open && (
        <div className="settings_panel">
          <div className="settings_section">
            <label className="settings_label">Model</label>
            <select className="settings_select" value={model} onChange={handleModelChange}>
              {AVAILABLE_MODELS.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>

          <div className="settings_section">
            <label className="settings_label">Persona</label>
            <textarea
              className="settings_persona"
              placeholder="e.g. You are a concise assistant that always responds in bullet points."
              value={persona}
              onChange={handlePersonaChange}
              rows={5}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSettings;
