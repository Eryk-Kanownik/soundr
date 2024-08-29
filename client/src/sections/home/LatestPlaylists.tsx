import Playlists from "../../suspense/home/Playlists";

const LatestPlaylists = () => {
  return (
    <div className="mb-4 text-white">
      <h2 className="text-xl font-semibold mb-2">Latest Playlists</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Playlists />
      </div>
    </div>
  );
};

export default LatestPlaylists;
