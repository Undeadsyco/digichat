// Dependencies
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Layout
import { ViewLayout } from "../../layouts";
// Custom Components
import { List, FriendCard, IncomingCard, OutgoingCard } from "./components";
// Hooks
import { useUserViewReducer } from "../../../hooks";

/**
 * @typedef {Object} ListItem
 * @property {string} title
 * @property {Function} callback
 */

/**
 * 
 * @version 1.0.0
 * @since 2.0.0
 * @category Components/views/UserView
 * 
 * @param {UserViewProps} props
 * @returns {React.Component}
 */
const UserView = ({ user, list, onSetRedirect, onSetError, onSetViewData }) => {
  const { state, actions } = useUserViewReducer({ onSetRedirect, onSetError });

  useEffect(() => {
    list.forEach(({ title, callback }) => actions.getAll(title, callback));
    return () => onSetViewData("users", state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCard = (type) => {
    switch (type) {
      case 'friends':
        return FriendCard;
      case 'incoming':
        return IncomingCard;
      case 'outgoing':
        return OutgoingCard;
      default:
        return null;
    }
  }

  const openSearchModal = () => {
    console.log('Open Search Modal');
  }

  return (
    <ViewLayout handleClick={openSearchModal} label="Search Other Users">
      <>
        {list?.map(({ title }) => (
          <List key={title} onSetRedirect={onSetRedirect} title={title} list={state[title]} Card={selectCard(title)} />
        ))}
      </>
    </ViewLayout>
  );
}

/**
 * @typedef {Object} UserViewProps
 * @property {Object} user
 * @property {Function} onSetRedirect
 * @property {Function} onSetError
 * @property {ListItem[]} list
 */
UserView.propTypes = {
  user: PropTypes.object.isRequired,
  onSetRedirect: PropTypes.func.isRequired,
  onSetError: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
  })).isRequired
}

export default UserView;
