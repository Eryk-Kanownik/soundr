import React from "react";
import { FaCompactDisc } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { usePlayerState } from "../../global-state/player";

interface IPlaylistCard {
  id: string;
  name: string;
  onClick?: () => void;
}

const PlaylistCard: React.FC<IPlaylistCard> = ({ id, name, onClick }) => {
  const { currentPlaylistId, isPlaying } = usePlayerState(
    (state: any) => state
  );

  return (
    <Link
      to={`/playlists/${id}`}
      className={`p-2 text-white bg-slate-500/10 hover:bg-slate-500/100 duration-200 cursor-pointer rounded-md shadow-md flex justify-between items-center gap-3 ${
        currentPlaylistId === id && isPlaying
          ? "bg-slate-500/50"
          : "bg-slate-500/10"
      }`}
      onClick={onClick}>
      <div className="flex justify-center items-center gap-2">
        <img
          src="https://picsum.photos/200/300"
          className="rounded-md aspect-square w-[45px]"
        />
        <p className="font-bold text-sm">{name}</p>
      </div>
      <div>
        {currentPlaylistId === id ? (
          <FaCompactDisc className="animate-spin" size={20} />
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default PlaylistCard;
