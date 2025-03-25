// Dependencies
import { useEffect } from "react";
import { Routes, Route, useNavigate, redirect } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// Layouts
import { AppLayout, PageLayout } from "./components/layouts";
// Components
import { Login, SignUp, MainPage, GroupPage, ProfilePage } from "./components/pages";
// Hooks
import useAppReducer from "./hooks/useAppReducer";
import { Modal, Redirect, AppUser } from "./state/atoms";
// CSS
import "./styles/App.css";
// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserPlus, faSignInAlt, faHome, faBars, faTimesCircle, faUserCircle, faEnvelope, faUser, faLock, faInfoCircle, faSignOutAlt,
  faIdBadge, faAddressBook, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots, faPlusCircle, faGlobe, faPaperPlane,
  faEllipsis, faTrashCan, faPenToSquare, faUserGroup, faUsersBetweenLines, faFaceGrinHearts, faFaceGrinTears, faFaceSurprise,
  faFaceSadCry, faFaceAngry, faHeart, faUserMinus, faUserXmark, faCircleArrowRight, faUserCheck
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faUserPlus, faSignInAlt, faHome, faBars, faTimesCircle, faUserCircle, faEnvelope, faUser, faLock, faInfoCircle, faSignOutAlt,
  faIdBadge, faAddressBook, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots, faPlusCircle, faGlobe, faPaperPlane,
  faEllipsis, faTrashCan, faPenToSquare, faUserGroup, faUsersBetweenLines, faFaceGrinHearts, faFaceGrinTears, faFaceSurprise,
  faFaceSadCry, faFaceAngry, faHeart, faUserMinus, faUserXmark, faCircleArrowRight, faUserCheck
);

function App() {
  const user = useRecoilValue(AppUser);
  const modal = useRecoilValue(Modal);
  const [redirect, setRedirect] = useRecoilState(Redirect);

  const navigate = useNavigate();
  const { state, actions } = useAppReducer();

  useEffect(() => {
    if (!modal.loading && !user) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, user]);

  useEffect(() => {
    if (!modal.loading && redirect) navigate(redirect);
    return () => setRedirect(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect, modal.loading]);

  return (
    <div className="relative z-0 w-dvw h-dvh overflow-hidden grid grid-cols-4 grid-rows-10">
      <Routes>
        <Route element={<AppLayout {...{ user }} />}>
          <Route Component={PageLayout}  >
            <Route index path="/feed" Component={MainPage} />
            {/* <Route path="/group/:id" Component={GroupPage} /> */}
            {/* <Route path="/profile/:id" Component={ProfilePage} /> */}
          </Route>
          <Route index path='/login' Component={Login} />
          <Route path='/signup' Component={SignUp} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
