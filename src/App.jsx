import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";
import LoginPage from "./LoginPage";
import { loadConversations } from "./Dashboard/dashboardSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(loadConversations());
    }
  }, [token, dispatch]);

  if (!token) return <LoginPage />;

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
