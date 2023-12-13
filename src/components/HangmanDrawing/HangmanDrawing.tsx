import React from 'react';

import './HangmanDrawing.scss';

const head = (
    <div className="drawing-wrapper__head" />
);

const body = (
    <div className="drawing-wrapper__body" />
);

const rightArm = (
    <div className="drawing-wrapper__right-arm" />
);

const leftArm = (
    <div className="drawing-wrapper__left-arm" />
);

const rightLeg = (
    <div className="drawing-wrapper__right-leg" />
);

const leftLeg = (
    <div className="drawing-wrapper__left-leg" />
);

const bodyParts = [head, body, rightArm, leftArm, rightLeg, leftLeg];

interface HangmanDrawingProps {
    numberOfGuesses: number
}

const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ numberOfGuesses }) => {
    return (
        <div className="drawing-wrapper" >
            {bodyParts.slice(0, numberOfGuesses)}

            <div className="drawing-wrapper__rope-line" />
            <div className="drawing-wrapper__top-line" />
            <div className="drawing-wrapper__vertical-line" />
            <div className="drawing-wrapper__bottom-line" />
        </div>
    );
};

export default HangmanDrawing;