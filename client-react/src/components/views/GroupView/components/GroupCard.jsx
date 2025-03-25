// Dependencies
import PropTypes from 'prop-types';
// Custom Components
import IconBtn from "../../../global/IconBtn";
import Image from "../../../global/Image";
// Utils
import { stringCutoff } from "../../../../utils";

/**
 * Component to display a single group card * 
 * @component
 * @version 1.0.0
 * @since 2.0.0
 * @category Components/global/GroupView
 * @requires {@see IconBtn}
 * @requires {@see Image}
 * @requires {@see stringCutoff}
 * 
 * @param {GroupCardProps} props
 * @returns {React.Component}
 */
const GroupCard = ({ groupId, name, description, privacy, owner, membershipCount, postCount, onSetRedirect }) => {
  return (
    <div className='group mb-2 block relative z-0'>
      <div onClick={() => onSetRedirect(`/group/${groupId}`)} className="h-20 group-even:gradient-45 group-odd:-gradient-45 rounded-t-4xl p-2 border-0 grid grid-cols-5">
        <Image className="justify-self-center" src="/profile_pic.jpg" />
        <span className="inline-flex flex-col ms-2 col-span-2 items-start">
          <h2 className="text-xl font-extrabold">{name}</h2>
          <span className="inline-block">
            <IconBtn size="sm" icon={privacy ? "lock" : "globe"} color="black" />
          </span>
        </span>

        <div className="col-span-full row-start-2 flex">
          <IconBtn size="base" icon="user" color="black" label={`Owner: ${owner.userName}`} />
        </div>
      </div>
      <div onClick={() => onSetRedirect(`/group/${groupId}`)} className="h-20 text-lg group-odd:gradient-45 group-even:-gradient-45 rounded-b-4xl p-2 border-0 grid grid-cols-5 px-4">
        <p className="col-span-full">{stringCutoff(description, 40)}</p>
        <span className="inline-flex items-center col-span-2">
          <span className="text-black text-sm font-extrabold">Members</span>
          <IconBtn size="sm" icon="users-between-lines" color="black" label={`: ${membershipCount}`} />
        </span>
        <span className="inline-flex items-center col-span-2">
          <span className="text-black text-sm font-extrabold">Posts</span>
          <IconBtn size="sm" icon="comment-dots" color="black" label={`: ${postCount}`} />
        </span>
      </div>
      <span className="absolute top-4 right-2 z-10">
        {/* TODO: implement sent request to join group */}
        <IconBtn size="4xl" icon="plus-circle" color="black" onClick={() => {}} />
      </span>
    </div>
  );
}

/**
 * @typedef {Object} GroupCardProps
 * @property {(string|number)} groupId
 * @property {string} name
 * @property {string} description
 * @property {boolean|number} private
 * @property {{ userId: (String|number), userName: String }} owner
 * @property {number} membershipCount
 * @property {number} postCount
 */
GroupCard.propTypes = {
  groupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  privacy: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  owner: PropTypes.shape({
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  membershipCount: PropTypes.number.isRequired,
  postCount: PropTypes.number.isRequired,
  onSetRedirect: PropTypes.func.isRequired,
}

export default GroupCard;
