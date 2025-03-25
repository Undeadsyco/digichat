// Dependencies
// Dependency Components
import { Outlet } from "react-router-dom";
// Custom Components
import Header from "./Header";
import Modal from "./Modal";

/**
 * Component that renders the layout of the application
 * @param {Object} props
 * @param {Object} props.user
 * @param {Boolean} props.loading 
 * @returns {React.Component}
 * 
 * @version 2.0.0
 * @since 2.0.0
 * @see Modal
 * @see LoadingPanel
 * @see Header
 * @see {@link https://reactrouter.com/en/6.22.3/components/outlet} Outlet
 * @see Footer
 */
const Layout = ({ user }) => {
  return (
    <>
      <Modal />
      <Header user={user} />
      <Outlet context={{ user }} />
    </>
  );
}

export default Layout;