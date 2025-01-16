import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { useEffect } from "react";

import {Navigate} from "react-router-dom"

import { ProtectedRoute } from "./routes/protectedRoute";
import { useAuth } from "./store/hooks/authHooks";
import { useRecoilValue } from "recoil";
import { authAtom } from "./store/atoms/atoms";

function App() {
  const { loadUser } = useAuth();
const isAuthenticated = useRecoilValue(authAtom)

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to={"/dashboard"}/>} />
          <Route path="/signin" element={ !isAuthenticated ?  <SignIn /> :<Navigate to={"/dashboard"}/>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
