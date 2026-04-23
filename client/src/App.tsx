import { useCallback, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { SignPage } from "./pages/signinup";
import { SharedBrain } from "./pages/SharedBrain";
import { Header } from "./components/Header";

function App() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const handleAuth = useCallback((nextToken: string) => {
    localStorage.setItem("token", nextToken);
    setToken(nextToken);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  const loggedIn = !!token;

  return (
    <BrowserRouter>
      <Header logedIn={loggedIn} open={open} setOpen={setOpen} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={loggedIn ? "/dashboard" : "/signin"} replace />}
        />
        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignPage key="signup" initialMode="signup" onAuth={handleAuth} />
            )
          }
        />
        <Route
          path="/signin"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignPage key="signin" initialMode="signin" onAuth={handleAuth} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            loggedIn ? (
              <Dashboard open={open} setOpen={setOpen} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route path="/brain/:hash" element={<SharedBrain />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
