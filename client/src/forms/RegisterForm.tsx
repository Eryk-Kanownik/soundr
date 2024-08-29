import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNotificationState } from "../global-state/notifications";

const RegisterForm = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const { setNotification } = useNotificationState((state: any) => state);
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res = await axios.post(`/api/auth/register`, data);
    setNotification(res.data);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      className="w-96 p-8 bg-slate-700/50 rounded-md flex flex-col"
      onSubmit={onSubmitForm}>
      <h2 className="text-2xl font-bold mb-2">Register to Soundr</h2>
      <div className="flex flex-col mb-2">
        <label className="">Username</label>
        <input
          type="text"
          name="username"
          className="input-text"
          onChange={onChangeInput}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="input-text"
          onChange={onChangeInput}
        />
      </div>
      <Link to="/login" className="text-sm mb-3">
        If you don't have an account click here to register!
      </Link>
      <button className=" border-2 border-white/0 duration-200 px-2 py-1 rounded-md bg-slate-800 hover:border-white/100">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
