import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IconBtn } from "../../../global";
import { list } from "postcss";

const List = ({ user, title, list, Card, onSetRedirect, onSetError }) => {

  return (
    <div className="w-full flex flex-wrap mb-4 h-fit">
      <h3 className="text-3xl font-extrabold w-2/3">{title}</h3>
      {list?.length > 2 && <IconBtn icon="circle-arrow-right" color="black" className="ml-auto" />}
      <hr className="border-primary-400 border w-full" />
      <div className="flex overflow-y-hidden overflow-x-scroll no-scrollbar w-full h-fit mt-2">
        {list?.map((user) => <Card onSetRedirect={onSetRedirect} key={user.userId} {...user} />)}
      </div>
    </div>
  )
}

List.propTypes = {
  // user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  Card: PropTypes.elementType.isRequired,
  // onSetRedirect: PropTypes.func.isRequired,
  // onSetError: PropTypes.func.isRequired
}

export default List;