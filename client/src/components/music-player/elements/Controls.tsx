import { useEffect, useRef, useState } from "react";
import {
  FaArrowRotateLeft,
  FaShuffle,
  FaPlay,
  FaPause,
  FaForwardStep,
  FaBackwardStep,
} from "react-icons/fa6";
import { usePlayerState } from "../../../global-state/player";
import axios from "axios";
import { LATEST_10_SONGS } from "../../../suspense/home/Songs";
import { countMinutes } from "../../../lib/countMinutes";
import { FIRST_SONG } from "../../../sections/playlist/PlaylistButton";
import { authConfig } from "../../../lib/authConfig";

const Controls = () => {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const {
    currentSong,
    setCurrentSong,
    currentSongId,
    setCurrentSongId,
    currentPlaylist,
    setCurrentPlaylist,
    currentPlaylistId,
    latest10Songs,
    setLatest10AsPlaylist,
    isPlaying,
    setIsPlaying,
    repeat,
    setRepeat,
    volume,
  } = usePlayerState((state: any) => state);
  const [time, setTime] = useState({ currentTime: 0, duration: 0 });

  //controls
  const play = () => {
    playerRef.current!.play();
    setIsPlaying(true);
  };

  const pause = () => {
    playerRef.current!.pause();
    setIsPlaying(false);
  };

  const prev = () => {
    let firstIndex = 0;
    let index = currentPlaylist
      .map((song: any) => song.id)
      .indexOf(currentSong.id);
    var pervSong;
    if (index === firstIndex) {
      pervSong = currentPlaylist[currentPlaylist.length - 1];
    } else {
      pervSong = currentPlaylist[index - 1];
    }
    setCurrentSong(pervSong);
  };

  const next = () => {
    let lastIndex = currentPlaylist.length - 1;
    let index = currentPlaylist
      .map((song: any) => song.id)
      .indexOf(currentSong.id);
    var nextSong;
    if (index === lastIndex) {
      nextSong = currentPlaylist[0];
    } else {
      nextSong = currentPlaylist[index + 1];
    }
    setCurrentSong(nextSong);
  };

  const playBtn = isPlaying ? (
    <FaPause size={25} onClick={pause} className="cursor-pointer" />
  ) : (
    <FaPlay size={25} onClick={play} className="cursor-pointer" />
  );

  //load song from global state
  useEffect(() => {
    if (currentSong !== null) {
      setCurrentSongId(currentSong.id);
      playerRef!.current!.src = `${import.meta.env.VITE_SERVER_ADRESS}${
        currentSong.songSrc
      }`;
      playerRef!.current!.load();
    }
  }, [currentSong]);

  //load playlist from id
  useEffect(() => {
    async function getPlaylistById(playlistId: string) {
      let res = await axios.get(`/api/playlists/${playlistId}`, authConfig);
      setCurrentPlaylist(res.data.songs);
    }

    async function getPlaylistAndPlayFirstSong(playlistId: string) {
      let res = await axios.get(`/api/playlists/${playlistId}`, authConfig);
      setCurrentPlaylist(res.data.songs);
      setCurrentSong(res.data.songs[0]);
    }

    if (currentPlaylistId !== null) {
      if (currentPlaylistId === LATEST_10_SONGS) {
        setLatest10AsPlaylist();
        //choose song
        let song =
          latest10Songs[
            latest10Songs.map((song: any) => song.id).indexOf(currentSongId)
          ];
        setCurrentSong(song);
      } else {
        if (currentSongId === FIRST_SONG) {
          getPlaylistAndPlayFirstSong(currentPlaylistId);
        } else {
          getPlaylistById(currentPlaylistId);
          let song =
            latest10Songs[
              latest10Songs.map((song: any) => song.id).indexOf(currentSongId)
            ];
          setCurrentSong(song);
        }
      }
    }
  }, [currentPlaylistId]);

  //audio events
  const onLoadedMetadata = () => {
    playerRef!.current!.play();
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    let currentTime = Math.floor(playerRef.current!.currentTime);
    let duration = Math.floor(playerRef.current!.duration);
    setTime({ currentTime, duration });
  };

  const onEnded = () => {
    if (repeat) {
      playerRef.current!.currentTime = 0;
      playerRef.current!.play();
    } else {
      next();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playerRef.current?.play();
    } else {
      playerRef.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    playerRef.current!.volume = volume / 100;
  }, [volume]);

  return (
    <div className="absolute left-[50%] translate-x-[-50%] text-white">
      <audio
        ref={playerRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      <div className="flex gap-3 justify-center items-center mb-3">
        <FaShuffle className="cursor-pointer" />
        <FaBackwardStep size={20} onClick={prev} className="cursor-pointer" />
        {playBtn}{" "}
        <FaForwardStep size={20} onClick={next} className="cursor-pointer" />
        <FaArrowRotateLeft
          className={`cursor-pointer ${
            repeat ? " text-gray-500" : "text-white"
          }`}
          onClick={() => setRepeat(!repeat)}
        />
      </div>
      <div className="grid grid-cols-[auto,1fr,auto] gap-2 w-[290px] ">
        <p>{countMinutes(time.currentTime)}</p>
        <input
          type="range"
          className=""
          min={0}
          max={Number.isNaN(time.duration) ? "00:00" : time?.duration}
          value={time?.currentTime}
          onChange={(e) =>
            (playerRef.current!.currentTime = parseInt(e.target.value))
          }
        />
        <p>{countMinutes(time.duration)}</p>
      </div>
    </div>
  );
};

export default Controls;
