import { IconBtn } from "../../../global";
import UserCard from "./UserCard";

const FriendCard = (user) => (
  <UserCard {...user}>
    <IconBtn size="base" icon="user-minus" label="Remove" labelPos="bottom" />
    <IconBtn size="base" icon="user-xmark" label="Block" labelPos="bottom" />
  </UserCard>
);



export default FriendCard;
