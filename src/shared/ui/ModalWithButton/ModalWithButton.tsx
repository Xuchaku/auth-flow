import { cloneElement, forwardRef, HTMLAttributes, ReactElement, useState } from 'react';
import Modal from 'react-modal';
import { customStyles } from './styles';

type ModalWithButtonProps = HTMLAttributes<HTMLDivElement> & {
   trigger: ReactElement;
};

export const ModalWithButton = forwardRef<ReactModal, ModalWithButtonProps>((props, ref) => {
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
         <Modal
            isOpen={isOpenModal}
            onRequestClose={handleCloseModal}
            style={customStyles}
            ref={ref}
         >
            {props.children}
         </Modal>
      </>
   );
});
