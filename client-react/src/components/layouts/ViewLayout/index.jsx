import PropTypes from 'prop-types';
import { IconBtn, Image } from '../../global';

const ViewLayout = ({ children, handleClick, label }) => {
  return (
    <section className={
      "subgrid col-span-full row-span-8 relative z-0 pb-1 shadow-[5px_10px_10px_0_rgba(0,0,0,0.75)] overflow-y-auto overflow-x-hidden no-scrollbar"
    }>
      <div className="gradient-horizontal col-span-full row-span-1 row-start-1 flex items-center justify-around gradient-horizontal rounded-b-3xl bg-black p-2">
        <Image src="/profile_pic.jpg" alt="logo" />
        <input className="h-full w-2/3 rounded-full text-center" type="text" onFocus={() => handleClick()} placeholder={label} />
        <div><IconBtn size="4xl" icon="plus-circle" color="black" onClick={() => handleClick()} /></div>
      </div>

      <div className="col-span-full row-span-full row-start-2 p-2">
        {children}
      </div>
    </section>
  );
}

ViewLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ViewLayout;
