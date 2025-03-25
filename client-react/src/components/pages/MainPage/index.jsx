// Dependencies
import { useRecoilValue, useSetRecoilState } from 'recoil';
// Views
import { GroupView, FeedView, UserView } from '../../views';
// state
import { Groups, MainPageState, Posts, Users } from '../../../state/atoms';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';


const MainPage = () => {
  const { user } = useOutletContext();
  const state = useRecoilValue(MainPageState);
  const setPosts = useSetRecoilState(Posts);
  const setUsers = useSetRecoilState(Users);
  const setGroups = useSetRecoilState(Groups);

  useEffect(() => {
    if (user) {
      setPosts(state.posts);
      setUsers(state.users);
      setGroups(state.groups);
    }
  }, [user, state]);

  return (
    <>
      {state.view === "groups" && <GroupView {...{ user }} />}

      {state.view === "feed" && <FeedView {...{ user }} />}

      {state.view === "users" && <UserView {...{ user }} />}
    </>
  )
}

export default MainPage;
