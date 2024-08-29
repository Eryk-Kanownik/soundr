import { useLocation } from "react-router-dom";
import LoggedUser from "./elements/LoggedUser";
import Playlists from "./elements/Playlists";
import { FaAngleRight } from "react-icons/fa6";
import { useSidebarState } from "../../global-state/sidebar";

const Sidebar = () => {
  const { sidebarFolded, setSidebarFolded } = useSidebarState(
    (state: any) => state
  );
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <div
      className={`bg-slate-800 md:bg-slate-500/0 z-10 text-white w-[300px] grid grid-rows-[auto,1fr] h-[calc(100%-82px)] duration-200 absolute top-0 left-0 ${
        sidebarFolded ? "-translate-x-[100%]" : "translate-x-[0]"
      }`}>
      <button
        className="absolute -right-5  h-[100%]   "
        onClick={setSidebarFolded}>
        <FaAngleRight
          className={`${
            sidebarFolded ? "rotate-0" : "rotate-180"
          } duration-500`}
          size={20}
        />
      </button>
      <LoggedUser />
      <Playlists />
    </div>
  );
};

export default Sidebar;
