import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/output.css";

import Index from "./pages/Index";
import Playlist from "./pages/Playlist";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePlaylist from "./pages/CreatePlaylist";

import MusicPlayer from "./components/music-player/MusicPlayer";
import Sidebar from "./components/sidebar/Sidebar";
import Notification from "./components/notification/Notification";
import AuthComponent from "./lib/AuthComponent";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <AuthComponent>
              <Index />
            </AuthComponent>
          }
        />
        <Route
          path="/playlists/:id"
          element={
            <AuthComponent>
              <Playlist />
            </AuthComponent>
          }
        />
        <Route
          path="/upload-song"
          element={
            <AuthComponent>
              <Upload />
            </AuthComponent>
          }
        />
        <Route
          path="/create-playlist"
          element={
            <AuthComponent>
              <CreatePlaylist />
            </AuthComponent>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <MusicPlayer />
      <Notification />
    </BrowserRouter>
  );
}

export default App;
