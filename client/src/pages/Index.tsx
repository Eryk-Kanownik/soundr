import { useSidebarState } from "../global-state/sidebar";
import HomePageHeader from "../sections/home/HomePageHeader";
import LatestPlaylists from "../sections/home/LatestPlaylists";
import LatestSongs from "../sections/home/LatestSongs";
import Options from "../sections/home/Options";

const Index = () => {
  const { sidebarFolded } = useSidebarState((state: any) => state);
  return (
    <div
      className={`${
        sidebarFolded ? "px-8 md:px-24" : "md:ml-[20%] px-8 md:px-24"
      }  py-12 h-[calc(100dvh-82px)] overflow-y-auto duration-200 text-white`}>
      <HomePageHeader />
      <LatestPlaylists />
      <LatestSongs />
      <Options />
    </div>
  );
};

export default Index;
