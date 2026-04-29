import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConversationModel, AVAILABLE_MODELS, DEFAULT_MODEL } from "../dashboardSlice";

const ModelSelector = () => {
  const dispatch = useDispatch();
  const { conversations, selectedConversationId } = useSelector(s => s.dashboard);
  const conversation = conversations.find(c => c.id === selectedConversationId);
  const model = conversation?.model || DEFAULT_MODEL;

  const handleChange = (e) => {
    dispatch(setConversationModel({ conversationId: selectedConversationId, model: e.target.value }));
  };

  return (
    <select className="model_selector" value={model} onChange={handleChange}>
      {AVAILABLE_MODELS.map(m => (
        <option key={m.id} value={m.id}>{m.label}</option>
      ))}
    </select>
  );
};

export default ModelSelector;
