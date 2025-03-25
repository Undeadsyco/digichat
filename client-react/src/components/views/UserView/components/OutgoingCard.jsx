import { IconBtn } from "../../../global";
import UserCard from "./UserCard";

const OutgoingCard = (user) => {
  return (
    <UserCard {...user}>
      <IconBtn size="base" icon="user-minus" label="Cancel" labelPos="bottom" />
      <IconBtn size="base" icon="user-xmark" label="Block" labelPos="bottom" />
    </UserCard>
  )
}

export default OutgoingCard;
