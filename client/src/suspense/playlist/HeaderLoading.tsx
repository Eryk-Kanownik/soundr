import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeaderLoading = () => {
  return (
    <div>
      <Link to="/" className="">
        <FaArrowLeft
          size={25}
          className="text-white mb-4 hover:text-gray-500 cursor-pointer duration-200"
        />
      </Link>
      <div className="w-96 h-[40px] bg-slate-500/50 animate-pulse rounded-md mb-2"></div>
      <div className="w-[75%] h-[40px] bg-slate-500/50 animate-pulse rounded-md mb-2"></div>
      <div className="w-[48px] h-[48px] bg-slate-500/50 animate-pulse rounded-full mb-2"></div>
    </div>
  );
};

export default HeaderLoading;
