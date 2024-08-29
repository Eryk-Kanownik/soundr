import { useEffect, useRef } from "react";
import { useNotificationState } from "../../global-state/notifications";

const Notification = () => {
  const { type, message, setNotification } = useNotificationState(
    (state: any) => state
  );
  const notifRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (type !== "" && message !== "") {
      notifRef.current?.classList.add("notification-visible");
      setTimeout(() => {
        notifRef.current?.classList.remove("notification-visible");
        setNotification({ type: "", message: "" });
      }, 5000);
    }
  }, [type, message]);

  return (
    <div
      className="absolute top-6 right-6 w-[400px] text-white bg-slate-800/90 shadow-md rounded-md p-8 -translate-y-[300%] duration-200"
      ref={notifRef}>
      <h2 className="font-semibold text-xl">{type}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
