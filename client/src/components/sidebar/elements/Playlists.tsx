import PlaylistCard from "../../cards/PlaylistCard";
import { useSidebarState } from "../../../global-state/sidebar";
import { useEffect } from "react";
import axios from "axios";
import SidebarPlaylistsLoading from "./SidebarPlaylistsLoading";
import { authConfig } from "../../../lib/authConfig";

const Playlists = () => {
  const userId = localStorage.getItem("id")!;
  const { sidebarPlaylists, setSidebarPlaylists, setSidebarFolded } =
    useSidebarState((state: any) => state);

  useEffect(() => {
    async function getUserPlaylists() {
      let res = await axios.get(`/api/playlists/users/${userId}`, authConfig);
      setSidebarPlaylists(res.data);
    }
    getUserPlaylists();
  }, []);

  if (sidebarPlaylists === null) return <SidebarPlaylistsLoading />;

  return (
    <div className="p-4 overflow-y-auto">
      <div className="mb-2">
        <h2 className="font-semibold mb-1">Your playlists</h2>
        <div className="flex flex-col gap-2">
          {sidebarPlaylists?.map(({ id, name }: any, key: React.Key) => (
            <PlaylistCard
              key={key}
              id={id}
              name={name}
              onClick={() => setSidebarFolded(true)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
