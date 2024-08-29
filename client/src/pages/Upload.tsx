import UploadForm from "../forms/UploadForm";
import { useSidebarState } from "../global-state/sidebar";
import UploadHeader from "../sections/upload/UploadHeader";

const Upload = () => {
  const { sidebarFolded } = useSidebarState((state: any) => state);
  return (
    <div
      className={`${
        sidebarFolded ? "px-8 md:px-24" : "md:ml-[20%] px-8 md:px-24"
      }  py-12 h-[calc(100dvh-82px)] overflow-y-auto duration-200 text-white`}>
      <UploadHeader />
      <div className="flex flex-col items-center justify-start">
        <h1 className="font-bold text-4xl mb-2">Upload song</h1>
        <UploadForm />
      </div>
    </div>
  );
};

export default Upload;
