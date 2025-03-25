// Dependecies
import { useState } from "react";
import { useLocation } from "react-router-dom";

// Componets
import NavLink from "./NavLink";
import Image from "../../../global/Image";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { Redirect, AppUser } from "../../../../state/atoms";


/**
 * Component for the Header of the application that displays the logo and navigation links
 * @component NavBar
 * @param {Object} props
 * @param {Boolean} props.user 
 * @returns {React.Component}
 * 
 * @version 2.0.0
 * @since 2.0.0
 */
const Header = ({ user }) => {
  const resetUser = useResetRecoilState(AppUser);
  const setRedirect = useSetRecoilState(Redirect);

  const navStyles = "h-full w-3/4 row-span-full col-start-3 col-span-2 justify-self-end flex-end relative z-10 px-1";
  const navBgStyles = "before:absolute before:size-full before:top-left before:content-[''] before:bg-black before:-z-10 before:opacity-20 before:rounded-full";

  return (
    <header className='gradient-horizontal subgrid col-span-full justify-items-center items-center text-white'>
      <Image {...{ src: '/logo.png', alt: 'logo' }} />
      <h1 className="text-2xl text-white mb-2 row-span-full col-start-2 col-span-2 justify-self-start">
        <span className="text-black font-bold text-3xl">Digi{" "}</span>Chat
      </h1>
      <nav className={`${navStyles} ${navBgStyles}`}>
        {user && <NavLink {...{ label: 'feed', icon: 'home', onClick: () => setRedirect('/feed') }} />}
        {user && <NavLink {...{ label: 'login', icon: 'sign-out-alt', onClick: () => resetUser() }} />}
        {/* not logged in */}
        {!user && <NavLink {...{ label: 'login', icon: 'sign-in-alt', onClick: () => setRedirect("/login") }} />}
        {!user && <NavLink {...{ label: 'signup', icon: 'user-plus', onClick: () => setRedirect("/signup") }} />}
      </nav>
    </header>
  )
}

export default Header;