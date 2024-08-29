import Songs from "../../suspense/home/Songs";

const LatestSongs = () => {
  return (
    <div className="mb-6 text-white">
      <h2 className="text-xl font-semibold mb-2">Latest Songs</h2>
      <div className="flex flex-col gap-2">
        <Songs />
      </div>
    </div>
  );
};

export default LatestSongs;
