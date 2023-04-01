import { useEffect } from 'react';
import { Backdrop, ModalWrap } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ url, closeModal }) => {
  useEffect(() => {
    const handleModal = e => {
      if (e.code === 'Escape') {
        closeModal(e);
      }
    };
    window.addEventListener('keydown', handleModal);
    return () => window.removeEventListener('keydown', handleModal);
  }, [closeModal]);

  return (
    <Backdrop className="overlay" onClick={closeModal}>
      <ModalWrap className="modal">
        <img src={url} alt="" />
      </ModalWrap>
    </Backdrop>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,

  closeModal: PropTypes.func.isRequired,
};
