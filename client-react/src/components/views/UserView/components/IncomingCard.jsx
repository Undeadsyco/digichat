import UserCard from "./UserCard";
import { IconBtn } from "../../../global";

const AdminCard = (user) => {
  return (
    <UserCard {...user}>
      <IconBtn size="base" icon="user-check" label="Accept" labelPos="bottom" />
      <IconBtn size="base" icon="user-minus" label="Reject" labelPos="bottom" />
      <IconBtn size="base" icon="user-xmark" label="Block" labelPos="bottom" />
    </UserCard>
  )
}

export default AdminCard;
