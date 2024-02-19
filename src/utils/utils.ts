import { RefObject, SetStateAction } from 'react';

export const mouseEvent = (ref: RefObject<HTMLElement>, state: boolean, setState: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    const onClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
            setState(false);
        }
    };

    if (state) {
        document.addEventListener('mousedown', onClickOutside);
    } else {
        document.removeEventListener('mousedown', onClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', onClickOutside);
    };
};