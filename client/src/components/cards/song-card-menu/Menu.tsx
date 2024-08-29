import React, { useEffect, useRef, useState } from "react";
import { FaArrowDown, FaEllipsisVertical } from "react-icons/fa6";
import { useSidebarState } from "../../../global-state/sidebar";
import axios from "axios";
import { useNotificationState } from "../../../global-state/notifications";
import { usePlaylistState } from "../../../global-state/playlist";
import { authConfig } from "../../../lib/authConfig";

interface IMenu {
  songId: string;
}

export const Menu: React.FC<IMenu> = ({ songId }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { sidebarPlaylists, overwriteSidebarPlaylist } = useSidebarState(
    (state: any) => state
  );
  const { playlist, setPlaylist } = usePlaylistState((state: any) => state);
  const [unfolded, setUnfolded] = useState(false);
  const [unfoldedAddPlaylists, setUnfoldedAddPlaylists] = useState(false);
  const [unfoldedRemovePlaylists, setUnfoldedRemovePlaylists] = useState(false);
  const { setNotification } = useNotificationState((state: any) => state);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!menuRef?.current?.contains(event.target)) {
        setUnfolded(false);
        setUnfoldedAddPlaylists(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const onClickAddToPlaylist = async (playlistId: string, songId: string) => {
    let res = await axios.put(
      `/api/playlists/${playlistId}/songs/${songId}`,
      authConfig
    );

    if (playlist !== null) {
      setPlaylist(res.data.body);
    }

    overwriteSidebarPlaylist(res.data.body);
    setNotification(res.data);
    setUnfolded(false);
    setUnfoldedAddPlaylists(false);
    setUnfoldedRemovePlaylists(false);
  };

  const onClickRemoveFromPlaylist = async (
    playlistId: string,
    songId: string
  ) => {
    let res = await axios.delete(
      `/api/playlists/${playlistId}/songs/${songId}`,
      authConfig
    );
    if (playlist !== null) {
      setPlaylist(res.data.body);
    }
    overwriteSidebarPlaylist(res.data.body);
    setNotification(res.data);
    setUnfolded(false);
    setUnfoldedAddPlaylists(false);
    setUnfoldedRemovePlaylists(false);
  };

  return (
    <div className="relative " ref={menuRef}>
      <div onClick={() => setUnfolded(true)}>
        <FaEllipsisVertical size={20} className="text-white" />
      </div>
      <ul
        className={`absolute right-5  bg-slate-500 w-[180px] shadow-md rounded-md top-0 ${
          unfolded ? "scale-y-100" : "scale-y-0"
        }`}>
        <li
          className="relative px-2 py-2 text-white hover:bg-slate-400  hover:rounded-t-md flex justify-between items-center"
          onClick={() => setUnfoldedAddPlaylists((prev) => !prev)}>
          <p>Add to playlist...</p>
          <span>
            <FaArrowDown
              className={`${
                unfoldedAddPlaylists ? " rotate-180" : "rotate-0"
              } duration-200`}
            />
          </span>
        </li>
        <ul
          className={`${
            unfoldedAddPlaylists ? "max-h-[600px]" : "max-h-0"
          } bg-slate-700 rounded-b-md overflow-hidden origin-top duration-200`}>
          {sidebarPlaylists?.map(({ id, name }: any, key: React.Key) => {
            let pList =
              sidebarPlaylists[
                sidebarPlaylists.map((p: any) => p.id).indexOf(id)
              ];
            let isInPlaylist = pList?.songs
              .map((song: any) => song.id)
              .includes(songId);
            if (isInPlaylist === false) {
              return (
                <li
                  key={key}
                  className="text-white hover:bg-slate-400 px-2 py-2 text-sm w-full text-left font-semibold"
                  onClick={() => onClickAddToPlaylist(id, songId)}>
                  {name}
                </li>
              );
            }
          })}
        </ul>
        <li
          className="relative px-2 py-2 text-white hover:bg-slate-400  hover:rounded-t-md flex justify-between items-center"
          onClick={() => setUnfoldedRemovePlaylists((prev) => !prev)}>
          <p>Remove from playlist...</p>
          <span>
            <FaArrowDown
              className={`${
                unfoldedRemovePlaylists ? " rotate-180" : "rotate-0"
              } duration-200`}
            />
          </span>
        </li>
        <ul
          className={`${
            unfoldedRemovePlaylists ? "max-h-[600px]" : "max-h-0"
          } bg-slate-700 rounded-b-md overflow-hidden origin-top duration-200`}>
          {sidebarPlaylists?.map(({ id, name }: any, key: React.Key) => {
            let pList =
              sidebarPlaylists[
                sidebarPlaylists?.map((p: any) => p.id).indexOf(id)
              ];
            let isInPlaylist = pList.songs
              .map((song: any) => song.id)
              .includes(songId);
            if (isInPlaylist === true) {
              return (
                <li
                  key={key}
                  className="text-white hover:bg-slate-400 px-2 py-2 text-sm w-full text-left font-semibold"
                  onClick={() => onClickRemoveFromPlaylist(id, songId)}>
                  {name}
                </li>
              );
            }
          })}
        </ul>
      </ul>
    </div>
  );
};
