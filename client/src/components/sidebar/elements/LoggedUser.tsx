import { useLoggedUserState } from "../../../global-state/loggedUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoggedUser = () => {
  const navigate = useNavigate();
  const { username, token, setUser } = useLoggedUserState(
    (state: any) => state
  );

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUser({ id: null, username: null, token: null });
  };

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          src="https://picsum.photos/200/300"
          className="w-[30px] aspect-square rounded-full shadow-md"
        />
        <p className="font-bold text-sm">{username}</p>
      </div>
      <button className="button-default" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default LoggedUser;
