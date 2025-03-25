import { useLocation } from "react-router-dom";
import { IconBtn } from "../../global";
import { View } from "../../../state/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const Footer = ({ user }) => {
  const { pathname } = useLocation();
  const [view, setView] = useRecoilState(View);

  return (
    <footer className="gradient-horizontal subgrid row-start-10 col-span-full">
      {user && (
        <div className="px-12 col-span-full flex items-center justify-around">
          {pathname === '/feed' && (
            <>
              <IconBtn color={view === "feed" ? "white" : "black"} icon='home' onClick={() => setView('feed')} />
              <IconBtn color={view === "groups" ? "white" : "black"} icon='users-between-lines' onClick={() => setView('groups')} />
              <IconBtn color={view === "users" ? "white" : "black"} icon='user-group' onClick={() => setView('users')} />
            </>
          )}
        </div>
      )}
    </footer>
  );
}
export default Footer;
