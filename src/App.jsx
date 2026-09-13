import { BrowserRouter, Routes, Route } from "react-router-dom";
import DurandeWebsite from "./components/DurandeWebsite.jsx";
import ClientLogin from "./portal/ClientLogin.jsx";
import ClientPortal from "./portal/ClientPortal.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DurandeWebsite />} />
        <Route path="/portal/login" element={<ClientLogin />} />
        <Route path="/portal" element={<ClientPortal />} />
      </Routes>
    </BrowserRouter>
  );
}
