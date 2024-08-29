import CreatePlaylistForm from "../forms/CreatePlaylistForm";
import { useSidebarState } from "../global-state/sidebar";
import CreatePlaylistHeader from "../sections/create-playlist/CreatePlaylistHeader";

const CreatePlaylist = () => {
  const { sidebarFolded } = useSidebarState((state: any) => state);
  return (
    <div
      className={`${
        sidebarFolded ? "px-8 md:px-24" : "md:ml-[20%] px-8 md:px-24"
      }  py-12 h-[calc(100dvh-82px)] overflow-y-auto duration-200 text-white`}>
      <CreatePlaylistHeader />
      <div className="flex flex-col items-center justify-start">
        <h1 className="font-bold text-4xl mb-2">Create Playlist</h1>
        <CreatePlaylistForm />
      </div>
    </div>
  );
};

export default CreatePlaylist;
