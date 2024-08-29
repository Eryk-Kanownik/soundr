import { FaCompactDisc } from "react-icons/fa6";
import { usePlayerState } from "../../global-state/player";
import { Menu } from "./song-card-menu/Menu";

interface ISongCard {
  index: number;
  id: string;
  title: string;
  author: string;
  coverSrc: string;
  songSrc: string;

  playlistId: string;
}

const SongCard: React.FC<ISongCard> = ({
  index,
  id,
  title,
  author,
  coverSrc,
  songSrc,

  playlistId,
}) => {
  const {
    currentSong,
    setCurrentSong,
    setCurrentPlaylistByIds,
    currentPlaylistId,
  } = usePlayerState((state: any) => state);

  const onClickPlay = () => {
    if (currentPlaylistId !== playlistId) {
      setCurrentPlaylistByIds(playlistId, id);
    } else {
      setCurrentSong({ id, title, author, coverSrc, songSrc });
    }
  };

  return (
    <div
      className={`text-white p-2 grid grid-cols-[1fr,auto] gap-2 items-center  hover:bg-slate-500/100 duration-200 rounded-md shadow-md cursor-pointer ${
        currentSong?.id === id ? "bg-slate-500/50" : "bg-slate-500/10"
      }`}>
      <div className="" onClick={onClickPlay}>
        <div className="flex items-center gap-2">
          <div className="aspect-square w-[40px] flex justify-center items-center">
            {currentSong?.id === id ? (
              <FaCompactDisc className="animate-spin" size={20} />
            ) : (
              <>{index + 1}</>
            )}
          </div>
          <img
            src={`${import.meta.env.VITE_SERVER_ADRESS}${coverSrc}`}
            className="aspect-square w-[40px] rounded-md shadow-md object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-sm text-slate-300">{author}</p>
          </div>
        </div>
      </div>
      <Menu songId={id} />
    </div>
  );
};

export default SongCard;
