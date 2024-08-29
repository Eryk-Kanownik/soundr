import PlaylistCard from "../../components/cards/PlaylistCard";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaylistsLoading from "./PlaylistsLoading";
import { authConfig } from "../../lib/authConfig";

const Playlists = () => {
  const [playlists, setPlaylists] = useState<null | Array<Object>>(null);
  useEffect(() => {
    async function getPlaylists() {
      let res = await axios.get(`/api/playlists?take=8`, authConfig);
      if (res.data.body === undefined) {
        return setPlaylists([]);
      } else {
        return setPlaylists(res.data.body);
      }
    }
    getPlaylists();
  }, []);

  if (playlists === null) return <PlaylistsLoading />;

  return (
    <>
      {playlists.map(({ id, name }: any, key: React.Key) => (
        <PlaylistCard key={key} id={id} name={name} />
      ))}
    </>
  );
};

export default Playlists;
