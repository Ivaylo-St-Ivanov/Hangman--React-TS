import React from 'react';

import './HangmanDrawing.scss';

interface HangmanDrawingProps { }

const HangmanDrawing: React.FC<HangmanDrawingProps> = () => {
    return (
        <div className="drawing-wrapper" >
            <div className="drawing-wrapper__head" />
            <div className="drawing-wrapper__body" />
            <div className="drawing-wrapper__right-arm" />
            <div className="drawing-wrapper__left-arm" />
            <div className="drawing-wrapper__right-leg" />
            <div className="drawing-wrapper__left-leg" />

            <div className="drawing-wrapper__rope-line" />
            <div className="drawing-wrapper__top-line" />
            <div className="drawing-wrapper__vertical-line" />
            <div className="drawing-wrapper__bottom-line" />
        </div>
    );
};

export default HangmanDrawing;