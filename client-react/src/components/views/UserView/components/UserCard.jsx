// Dependencies
import PropTypes from "prop-types";
// Custom Components
import { Image } from "../../../global";
import { formatTime } from "../../../../utils";

const UserCard = ({ userId, userName, createdAt, onSetRedirect, children }) => (
  <div className="bg-primary-400 min-w-fit mr-2 p-2 rounded-4xl flex flex-col  last:m-0">
    <div className="flex w-fit" onClick={() => onSetRedirect(`/profile/${userId}`)}>
      <Image src="profile_pic.jpg" alt="profile" />
      <span className="inline-block mx-2">
        <h2 className="text-xl font-bold mb-auto">{userName}</h2>
        <h3 className="mt-auto">{formatTime(createdAt)}</h3>
      </span>
    </div>
    <div className="mt-2 flex">
      {children}
    </div>
  </div>
);

UserCard.propTypes = {
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default UserCard;
