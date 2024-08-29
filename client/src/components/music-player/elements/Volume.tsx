import { FaVolumeHigh } from "react-icons/fa6";
import { usePlayerState } from "../../../global-state/player";

const Volume = () => {
  const { setVolume, volume } = usePlayerState((state: any) => state);
  return (
    <div className=" gap-2 text-white hidden md:flex">
      <FaVolumeHigh size={20} />
      <input
        type="range"
        onChange={(e) => setVolume(e.target.value)}
        defaultValue={volume}
        min={0}
        max={100}
      />
    </div>
  );
};

export default Volume;
