import { Outlet, useOutletContext } from 'react-router-dom';
import Footer from './Footer';

const PageLayout = () => {
  const { user } = useOutletContext();

  return (
    <main className="p-0 bg-white place-content-center subgrid z-0 relative col-span-full row-start-2 row-span-full">
      <Outlet context={{ user }} />
      <Footer />
    </main>
  );
}

PageLayout.propTypes = {
};

export default PageLayout;
