import { useParams } from "react-router-dom";
import PlaylistHeader from "../sections/playlist/PlaylistHeader";
import SongCard from "../components/cards/SongCard";
import { usePlaylistState } from "../global-state/playlist";
import { useEffect, useState } from "react";
import { useSidebarState } from "../global-state/sidebar";
import axios from "axios";

import PlaylistSiteLoading from "../suspense/playlist/PlaylistSiteLoading";
import HeaderLoading from "../suspense/playlist/HeaderLoading";
import { authConfig } from "../lib/authConfig";

const Playlist = () => {
  const { sidebarFolded } = useSidebarState((state: any) => state);
  const { id } = useParams();
  const { playlist, setPlaylist } = usePlaylistState((state: any) => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPlaylist(id: string) {
      let res = await axios.get(`/api/playlists/${id}`, authConfig);
      setPlaylist(res.data);
      setIsLoading(false);
    }
    getPlaylist(id as string);
    return () => {
      setPlaylist(null);
      setIsLoading(true);
    };
  }, [id]);

  return (
    <div
      className={`${
        sidebarFolded ? "px-8 md:px-24" : "md:ml-[20%] px-8 md:px-24"
      }  py-12 h-[calc(100dvh-82px)] overflow-y-auto duration-200 text-white`}>
      {isLoading ? (
        <HeaderLoading />
      ) : (
        <PlaylistHeader
          id={id!}
          name={playlist?.name}
          description={playlist?.description}
          creator={playlist?.creator?.username}
        />
      )}

      <div className="flex flex-col gap-2">
        {isLoading ? (
          <PlaylistSiteLoading />
        ) : (
          playlist?.songs?.map(
            ({ id, title, author, coverSrc, songSrc }: any, index: number) => (
              <SongCard
                key={index}
                index={index}
                id={id}
                title={title}
                author={author}
                coverSrc={coverSrc}
                songSrc={songSrc}
                playlistId={playlist.id}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Playlist;
