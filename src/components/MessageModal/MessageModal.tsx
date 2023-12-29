import React from 'react';

import './MessageModal.scss';

interface MessageModalProps {
    onClickSettingsOnMessageModal: () => void
}

const MessageModal: React.FC<MessageModalProps> = ({ onClickSettingsOnMessageModal }) => {
    return (
        <div className="wrapper">
            <div className="wrapper__modal">
                <div>
                    <p>No matched word for these filters.</p>
                    <button onClick={onClickSettingsOnMessageModal}>Filters</button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;