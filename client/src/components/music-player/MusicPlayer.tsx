import CurrentSong from "./elements/CurrentSong";
import Controls from "./elements/Controls";
import Volume from "./elements/Volume";
import { useLocation } from "react-router-dom";

const MusicPlayer = () => {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <div
      className={`absolute bottom-0 h-[83.6px] left-0 right-0 flex p-4 justify-between items-center border-t-2 border-t-slate-700`}>
      <CurrentSong />
      <Controls />
      <Volume />
    </div>
  );
};

export default MusicPlayer;
