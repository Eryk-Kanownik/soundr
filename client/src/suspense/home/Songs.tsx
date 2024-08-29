import SongCard from "../../components/cards/SongCard";
import axios from "axios";
import { useEffect } from "react";
import { usePlayerState } from "../../global-state/player";
import SongsLoading from "./SongsLoading";
import { authConfig } from "../../lib/authConfig";

export const LATEST_10_SONGS = "LATEST_10_SONGS";

const Songs = () => {
  const { latest10Songs, setLatest10Songs } = usePlayerState(
    (state: any) => state
  );

  useEffect(() => {
    async function getSongs() {
      let res = await axios.get(`/api/songs?take=10`, authConfig);
      setLatest10Songs(res.data.body);
    }
    getSongs();
  }, []);

  if (latest10Songs === null) return <SongsLoading />;

  return (
    <>
      {latest10Songs.map(
        ({ id, title, author, coverSrc, songSrc }: any, index: number) => (
          <SongCard
            key={index}
            index={index}
            id={id}
            title={title}
            author={author}
            coverSrc={coverSrc}
            songSrc={songSrc}
            playlistId={LATEST_10_SONGS}
          />
        )
      )}
    </>
  );
};

export default Songs;
