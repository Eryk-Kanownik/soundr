import PlaylistButton from "./PlaylistButton";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

interface IPlaylistHeader {
  id: string;
  name: string;
  description: string;
  creator: string;
}

const PlaylistHeader: React.FC<IPlaylistHeader> = ({
  id,
  name,
  description,
  creator,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <Link to="/" className="">
        <FaArrowLeft
          size={25}
          className="text-white mb-4 hover:text-gray-500 cursor-pointer duration-200"
        />
      </Link>
      <h1 className="font-bold text-4xl mb-2">{name}</h1>
      <p className="text-sm text-slate-300">Created by: {creator}</p>
      <p className="text-sm mb-2 text-slate-400">{description}</p>
      <PlaylistButton playlistId={id} />
    </div>
  );
};

export default PlaylistHeader;
