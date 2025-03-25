// Dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Modal } from '../../../../state/atoms';
/**
 * Component for displaying a loading animation.
 * @param {LoadingProps} props
 * @returns {React.Component}
 * 
 * @version 2.0.0
 * @since 2.0.0
 */
const ModalComponent = () => {
  const modal = useRecoilValue(Modal);
  const resetModal = useResetRecoilState(Modal);

  return modal.display && (
    <div className="z-20 absolute top-left flex-center size-screen-small bg-transparent before:content-[''] before:absolute before:left-0 before:top-0 before:size-screen-small before:bg-black before:opacity-70 before:-z-10 before:h-svh">
      {!modal.loading && (
        <button className="absolute top-0 right-0 p-2" onClick={resetModal}>
          <FontAwesomeIcon icon="times-circle" className='text-4xl text-red-500 absolute top-3 right-3' />
        </button>
      )}
      {modal.Children}
    </div>
  );
}

export default ModalComponent;
