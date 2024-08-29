import { usePlayerState } from "../../../global-state/player";

const CurrentSong = () => {
  const { currentSong } = usePlayerState((state: any) => state);
  return (
    <div className="hidden md:flex gap-2 items-center text-white">
      {currentSong?.coverSrc ? (
        <img
          src={`${import.meta.env.VITE_SERVER_ADRESS}${currentSong?.coverSrc}`}
          className="w-[50px] aspect-square rounded-md shadow-md object-cover"
        />
      ) : (
        <div className="w-[50px] aspect-square bg-slate-800 rounded-md shadow-md"></div>
      )}
      <div>
        <p className="text-sm font-semibold">{currentSong?.title}</p>
        <p className="text-sm text-slate-300">{currentSong?.author}</p>
      </div>
    </div>
  );
};

export default CurrentSong;
