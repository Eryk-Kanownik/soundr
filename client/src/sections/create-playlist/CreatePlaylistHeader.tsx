import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CreatePlaylistHeader = () => {
  return (
    <div className="mb-2">
      <Link to="/" className="">
        <FaArrowLeft
          size={25}
          className="text-white mb-4 hover:text-gray-500 cursor-pointer duration-200"
        />
      </Link>
    </div>
  );
};

export default CreatePlaylistHeader;
