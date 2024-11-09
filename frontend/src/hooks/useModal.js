import React, { useCallback, useContext, useMemo, useState } from 'react';
import ConfirmationModal from '../modals/ConfirmationModal';
import ResetPasswordModal from '../modals/ResetPasswordModal';
import TrainingDetailsModal from '../modals/TrainingDetailsModal';
import EditTrainingModal from '../modals/EditTrainingModal';

const ModalContext = React.createContext();

export const MODAL_TYPE = {
    CONFIRMATION: 'CONFIRMATION',
    RESET_PASSWORD: 'RESET_PASSWORD',
    TRAINING_DETAILS: 'TRAINING_DETAILS',
    EDIT_TRAINING: 'EDIT_TRAINING',
    NONE: false,
};

export function Modals() {
    return (
        <ModalContext.Consumer>
            {(context) => {
                const allProps = {
                    ...context.props,
                    currentlyShowingModal: context.currentlyShowingModal,
                    showModal: context.showModal,
                    MODAL_TYPE,
                };
                return (
                    <div>
                        {context.currentlyShowingModal === MODAL_TYPE.CONFIRMATION && (
                            <ConfirmationModal {...allProps} />
                        )}
                        {context.currentlyShowingModal === MODAL_TYPE.RESET_PASSWORD && (
                            <ResetPasswordModal {...allProps} />
                        )}
                        {context.currentlyShowingModal === MODAL_TYPE.TRAINING_DETAILS && (
                            <TrainingDetailsModal {...allProps} />
                        )}
                        {context.currentlyShowingModal === MODAL_TYPE.EDIT_TRAINING && (
                            <EditTrainingModal {...allProps} />
                        )}
                    </div>
                );
            }}
        </ModalContext.Consumer>
    );
}

export function ModalContextProvider({ children }) {
    const [modalState, setModalState] = useState({
        currentlyShowingModal: false,
        props: {},
    });

    const showModal = useCallback(
        (currentlyShowingModal, newprops = {}) => {
            setModalState({
                currentlyShowingModal,
                props: newprops,
            });
        },
        [setModalState]
    );

    return useMemo(
        () => (
            <ModalContext.Provider value={{ ...modalState, showModal }}>
                {children}
                <Modals />
            </ModalContext.Provider>
        ),
        [modalState, showModal, children]
    );
}

ModalContext.displayName = 'ModalContext';

export function useModals() {
    return useContext(ModalContext);
}
