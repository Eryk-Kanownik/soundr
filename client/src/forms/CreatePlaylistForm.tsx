import axios from "axios";
import { useState } from "react";
import { useNotificationState } from "../global-state/notifications";
import { useNavigate } from "react-router-dom";
import { useSidebarState } from "../global-state/sidebar";
import { authConfig } from "../lib/authConfig";

const CreatePlaylistForm = () => {
  const navigate = useNavigate();
  const { setNotification } = useNotificationState((state: any) => state);
  const { addPlaylist } = useSidebarState((state: any) => state);
  const [data, setData] = useState({ name: "", description: "" });

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res = await axios.post(`/api/playlists`, data, authConfig);
    setNotification(res.data);
    if (res.data.type === "Success") {
      let playlist = res.data.body;
      addPlaylist(playlist);
      navigate("/");
    }
  };

  return (
    <form className="flex flex-col w-full md:w-96" onSubmit={onSubmitForm}>
      <div className="flex flex-col mb-2">
        <label className="">Playlist name</label>
        <input
          type="text"
          name="name"
          className="input-text"
          onChange={onChangeInput}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label className="">Playlist name</label>
        <textarea
          name="description"
          className="input-text resize-none"
          rows={5}
          onChange={onChangeInput}></textarea>
      </div>
      <button className="button-default">Create Playlist</button>
    </form>
  );
};

export default CreatePlaylistForm;
