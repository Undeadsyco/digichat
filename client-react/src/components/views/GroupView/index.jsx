// Dependencies
import { useEffect } from 'react';
import PropTypes from 'prop-types';
// Dependency Components
import { Formik } from 'formik';
// Components
import GroupCard from './components/GroupCard';
import GroupForm from './components/GroupForm';
// Hooks
import { useGroupViewReducer } from '../../../hooks';
// Utils
import { ViewLayout } from '../../layouts';

/**
 * Component to display the  list Groups requested by the user * 
 * @version 1.0.0
 * @since 2.0.0
 * @category Components/views/GroupView
 * @requires {@see GroupCard}
 * @requires {@see GroupForm}
 * @requires {@see ViewLayout}
 * @requires {@see useGroupViewReducer}
 * 
 * @param {GroupViewProps} props
 * @returns {React.Component}
 */
const GroupView = ({ getGroups, onSetRedirect, onOpenModal, onCloseModal, onSetError, onSetViewData }) => {
  const { state, actions } = useGroupViewReducer({ onSetError, onCloseModal });

  useEffect(() => {
    actions.onGetGroups(getGroups);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => onSetViewData('groups', state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OpenCreateGroupModal = () => {
    onOpenModal(
      <Formik
        component={GroupForm}
        initialValues={{ name: '', description: '', privacy: '0' }}
        onSubmit={state.onCreateGroup}
      />
    )
  }

  return (
    <ViewLayout handleClick={OpenCreateGroupModal} label="Create A Group">
      {/* Group List Display */}
      {!state.loading && state.groups.map(group => (
        <GroupCard  {...group} key={group.groupId} onSetRedirect={onSetRedirect} />
      ))}
    </ViewLayout>
  );
}

/**
 * @typedef {Object} GroupViewProps
 */
GroupView.propTypes = {
  getGroups: PropTypes.func.isRequired,
  onSetRedirect: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onSetError: PropTypes.func.isRequired,
}

export default GroupView;
