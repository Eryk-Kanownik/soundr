import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IAuthComponent {
  children: React.ReactNode;
}

const AuthComponent: React.FC<IAuthComponent> = ({ children }) => {
  const navigate = useNavigate();
  //verify token
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthComponent;
