import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import NewChatButton from "./NewChatButton.jsx";
import ListItem from "./ListItem";
import DeleteConversationsButton from "./DeleteConversationsButton";
import { setSelectedConversationId, createConversation, resetDashboard } from "../dashboardSlice";
import { clearAuth } from "../../authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const conversations = useSelector(state => state.dashboard.conversations);
  const user = useSelector(state => state.auth.user);

  const handleSetSelectedChat = (id) => dispatch(setSelectedConversationId(id));
  const handleNewChat = () => dispatch(createConversation());
  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(resetDashboard());
  };

  const filtered = search.trim()
    ? conversations.filter(c =>
        c.messages.some(m => m.content.toLowerCase().includes(search.toLowerCase()))
      )
    : conversations;

  return (
    <div className="sidebar_container">
      <NewChatButton handleSetSelectedChat={handleNewChat} />

      <div className="sidebar_search_container">
        <AiOutlineSearch color="grey" size={14} className="sidebar_search_icon" />
        <input
          className="sidebar_search"
          placeholder="Search chats…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="sidebar_conversations">
        {filtered.map(c => (
          <ListItem
            key={c.id}
            title={c.messages[0]?.content ?? "New Chat"}
            conversationId={c.id}
            handleSetSelectedChat={handleSetSelectedChat}
          />
        ))}
      </div>

      <div className="sidebar_bottom">
        {user && <p className="sidebar_username">{user.email}</p>}
        <DeleteConversationsButton />
        <div className="list_item logout_button" onClick={handleLogout}>
          <div className="list_item_icon"><RiLogoutBoxLine color="white" /></div>
          <p className="list_item_text">Log out</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
