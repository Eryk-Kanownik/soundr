import axios from "axios";
import { useEffect } from "react";
import { usePlaylistState } from "../global-state/playlist";

export function usePlaylist(id: string) {
  const { setPlaylist } = usePlaylistState((state: any) => state);
  useEffect(() => {
    async function getPlaylist() {
      let res = await axios.get(`/api/playlists/${id}`);
      let p = res.data;
      setPlaylist(p);
    }

    getPlaylist();
  }, [id]);
}
