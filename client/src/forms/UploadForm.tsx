import axios from "axios";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNotificationState } from "../global-state/notifications";
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  const navigate = useNavigate();
  const { setNotification } = useNotificationState((state: any) => state);
  const [songFile, setSongFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [data, setData] = useState<{
    title: string;
    author: string;
    duration: number;
  }>({
    title: "",
    author: "",
    duration: 0,
  });

  const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onChangeSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files![0];
    setSongFile(file);
    let objUrl = URL.createObjectURL(file);
    let audio = new Audio(objUrl);
    audio.addEventListener("loadedmetadata", () => {
      setData((prev) => ({ ...prev, duration: audio.duration }));
    });
  };

  const onChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files![0];
    setCoverFile(file);
  };

  const onSubmitUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("duration", data.duration.toString());
    formData.append("song-file", songFile as any);
    formData.append("cover-file", coverFile as any);
    let res = await axios.post(`/api/songs`, formData, {
      headers: {
        "content-type": "multipart/form-data",
        authorization: localStorage.getItem("token"),
      },
    });
    setNotification(res.data);
    console.log(res.data);
    if (res.data.type === "Success") {
      navigate("/");
    }
  };

  const disabled =
    songFile === null ||
    coverFile === null ||
    data.author === "" ||
    data.title === ""
      ? true
      : false;

  return (
    <form
      className=" rounded-md w-full md:w-96 flex flex-col"
      onSubmit={onSubmitUpload}>
      <div className="flex flex-col mb-2">
        <label className="">Title</label>
        <input
          type="text"
          name="title"
          className="input-text"
          onChange={onChangeTextField}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Author</label>
        <input
          type="text"
          name="author"
          className="input-text"
          onChange={onChangeTextField}
        />
      </div>
      <div className="flex flex-col mb-2">
        <div className="relative grid grid-cols-[1fr,auto]">
          <label
            htmlFor="song"
            className="input-text text-center text-sm p-2 cursor-pointer font-bold">
            {songFile ? songFile?.name : "Song File"}
          </label>
          {songFile && (
            <FaXmark
              size={20}
              onClick={() => setSongFile(null)}
              className="hover:text-red-400 z-10 cursor-pointer duration-200 absolute top-2 right-2"
            />
          )}
        </div>
        <input
          type="file"
          name="song-file"
          id="song"
          className="hidden"
          onChange={onChangeSong}
          accept=".mp3"
        />
      </div>
      <div className="relative flex flex-col mb-2">
        <div className="relative grid grid-cols-[1fr,auto]">
          <label
            htmlFor="cover"
            className="input-text text-center text-sm p-2 cursor-pointer font-bold">
            {coverFile ? coverFile?.name : "Cover File"}
          </label>
          {coverFile && (
            <FaXmark
              size={20}
              onClick={() => setCoverFile(null)}
              className="hover:text-red-400 z-10 cursor-pointer duration-200 absolute top-2 right-2"
            />
          )}
        </div>
        <input
          type="file"
          name="cover-file"
          id="cover"
          className="hidden"
          accept=".png, .jpg"
          onChange={onChangeCover}
        />
      </div>
      <button className="button-default" disabled={disabled}>
        Upload song
      </button>
    </form>
  );
};

export default UploadForm;
