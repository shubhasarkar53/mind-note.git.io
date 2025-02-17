import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { theme } from "./theme";

import { Navigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import SharedNote from "./components/SharedNote";
import { ProtectedRoute } from "./routes/protectedRoute";
import { authAtom } from "./store/atoms/atoms";
import { useAuth } from "./store/hooks/authHooks";
import Landing from "./pages/Landing";
import NotFound from "./components-new/Fallback";

function App() {
  const { loadUser } = useAuth();
  const isAuthenticated = useRecoilValue(authAtom);
  useEffect(() => {
    loadUser();
  }, []);

  // const loading = useRecoilValue(appLoadingAtom);

  // useEffect(() => {
  //   loadUser();
  // }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/signin"
            element={
              !isAuthenticated ? <SignIn /> : <Navigate to="/dashboard" />
            }
          />
          <Route path="/mindnote/share/:hash" element={<SharedNote />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </Router>
    </ThemeProvider>
  );
}

export default App;
