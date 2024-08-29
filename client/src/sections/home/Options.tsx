import { Link } from "react-router-dom";

const Options = () => {
  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-2">Options</h2>
      <div className="flex gap-2">
        <Link to="/upload-song" className="button-default">
          Upload song
        </Link>
        <Link to="/create-playlist" className="button-default">
          Create Playlist
        </Link>
      </div>
    </div>
  );
};

export default Options;
