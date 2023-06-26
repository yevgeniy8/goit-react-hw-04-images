import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalWrapper } from './Modal.styled';

import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, onClose }) => {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    const handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            onClose();
        }
    };

    const onClickBackdrop = evt => {
        if (evt.currentTarget === evt.target) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={onClickBackdrop}>
            <ModalWrapper>
                <img src={largeImageURL} alt="" />
            </ModalWrapper>
        </Overlay>,
        modalRoot
    );
};

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
