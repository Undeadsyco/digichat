import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Redirect } from "../../../../state/atoms";
import { useLocation } from "react-router-dom";

/**
 * @typedef {Object} Styles
 * @property {String} button
 * @property {String} icon_container
 * @property {String} icon
 * @property {String} label
 */

/**
 * @typedef {Object} NavLinkProps
 * @property {Function} onSetRedirect
 * @property {String} pathname
 * @property {String} to
 * @property {String} label
 * @property {String} icon
 * @property {String | Styles} className
 */

/**
 * 
 * @param {NavLinkProps} props {@see NavLinkProps}
 * @returns {React.Component}
 * 
 * @version 2.0.0
 * @since 2.0.0
 * 
 * this component renders a navigation link and can be customized with the className prop with either a string or an object
 * 
 * @example 
 * customization with a string:
 * <NavLink className="text-white" />
 * 
 * customization with an object:
 * <NavLink className={{ button: 'text-white', icon: 'text-black' }} />
 * 
 */
const NavLink = ({ label, icon, onClick }) => {
  const { pathname } = useLocation();
  const setRedirect = useSetRecoilState(Redirect);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setDisplay(() => {
      if (pathname.includes(label)) return false;
      return true;
    });
  }, [pathname, label]);

  return display ? (
    <button className="mx-2 text-3xl text-primary-50" onClick={onClick}>
      <span className="inline-block">
        <FontAwesomeIcon icon={icon} className="fa-fw hover:cursor-pointer " />
      </span>
      <span className="hidden">{label}</span>
    </button>
  ) : null;
}

export default NavLink;
