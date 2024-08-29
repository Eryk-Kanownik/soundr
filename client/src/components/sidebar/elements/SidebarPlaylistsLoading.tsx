import PlaylistCardLoading from "../../cards/loadings/PlaylistCardLoading";

const SidebarPlaylistsLoading = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="font-semibold mb-1">Your playlists</h2>
      <PlaylistCardLoading />
      <PlaylistCardLoading />
      <PlaylistCardLoading />
      <PlaylistCardLoading />
      <PlaylistCardLoading />
    </div>
  );
};

export default SidebarPlaylistsLoading;
