import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal } from '$redux/features/modal';

import './index.scss';

import AlertModal from '../Alert';
import LoginModal from '../Login';
import SignUpModal from '../SignUp';
import ForgotPasswordModal from '../ForgotPassword';
import LoaderModal from '../Loader';

const MODAL_COMPONENTS = {
  'ALERT_MODAL': AlertModal,
  'LOGIN_MODAL': LoginModal,
  'SIGNUP_MODAL': SignUpModal,
  'FORGOT_PASSWORD_MODAL': ForgotPasswordModal,
  'LOADER_MODAL': LoaderModal,
  'EMPTY': () => <div />,
};

const ModalRoot = () => {
  // store
  const dispatch = useDispatch();
  const modalType = useSelector((store) => store.modal.type);
  const modalProps = useSelector((store) => store.modal.modalProps);

  // effects
  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeydown);
      return;
    }

    document.body.style.overflow = 'unset'
    document.removeEventListener('keydown', handleKeydown);
  }, [modalType]);

  // handlers
  const closeModal = () => {
    dispatch(hideModal());
  }

  const handleKeydown = useCallback((evt) => {
    const { keyCode } = evt;
    // Esc key
    if (keyCode === 27) {
      closeModal();
    }
  }, [closeModal]);

  const handleClick = (evt) => {
    evt.preventDefault();
    dispatch(hideModal());
  };

  const handleInnerClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  }

  // render
  if (!modalType) {
    return null; 
  }

  const ModalContent = MODAL_COMPONENTS[modalType];

  if (modalProps && modalProps.noWrapper) {
    return (
      <div
        className="modal-container"
        onClick={handleClick}
      >
        <ModalContent
          {...modalProps}
          closeModal={closeModal}
        />
      </div>
    );
  }

  return (
    <div
      className="modal-container"
      onClick={handleClick}
    >
      <div className="row justify-content-center">
        <div className="col-10 col-md-8">
          <div
            className="modal-wrapper"
            onClick={handleInnerClick}
          >
            <ModalContent
              {...modalProps}
              closeModal={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalRoot;
