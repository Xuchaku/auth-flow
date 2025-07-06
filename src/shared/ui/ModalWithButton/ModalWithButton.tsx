import { cloneElement, HTMLAttributes, ReactElement, useState } from 'react';
import Modal from 'react-modal';

type ModalWithButtonProps = HTMLAttributes<HTMLDivElement> & {
   trigger: ReactElement;
};

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
   },
};

export const ModalWithButton = (props: ModalWithButtonProps) => {
   const { trigger, ...otherProps } = props;
   const [isOpenModal, setIsOpenModal] = useState(false);

   const onShowModal = () => {
      setIsOpenModal(true);
   };

   const handleCloseModal = () => {
      setIsOpenModal(false);
   };

   return (
      <>
         {cloneElement(trigger, { onClick: onShowModal })}
         <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal} style={customStyles}>
            {props.children}
         </Modal>
      </>
   );
};
