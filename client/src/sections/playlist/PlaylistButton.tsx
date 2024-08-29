import { FaPause, FaPlay } from "react-icons/fa6";
import { usePlayerState } from "../../global-state/player";

export const FIRST_SONG = "first-song";

interface IPlaylistButton {
  playlistId: string;
}

const PlaylistButton: React.FC<IPlaylistButton> = ({ playlistId }) => {
  const {
    setCurrentPlaylistByIds,
    currentPlaylistId,
    isPlaying,
    setIsPlaying,
  } = usePlayerState((state: any) => state);

  const onClickPlayPlaylist = () => {
    if (currentPlaylistId !== playlistId) {
      setCurrentPlaylistByIds(playlistId, FIRST_SONG);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="p-4 rounded-full bg-slate-700 w-12 aspect-square flex justify-center items-center duration-200 hover:bg-slate-600 cursor-pointer"
      onClick={onClickPlayPlaylist}>
      {currentPlaylistId === playlistId && isPlaying ? <FaPause /> : <FaPlay />}
    </div>
  );
};

export default PlaylistButton;
