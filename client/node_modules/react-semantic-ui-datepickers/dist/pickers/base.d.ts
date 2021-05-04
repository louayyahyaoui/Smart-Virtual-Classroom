import React from 'react';
import { BaseDatePickerProps } from '../types';
declare class BaseDatePicker extends React.Component<BaseDatePickerProps> {
    state: {
        offset: number;
    };
    rootNode: React.RefObject<HTMLDivElement>;
    handleArrowKeys: (event: any) => void;
    getKeyOffset(number: number): void;
    getRootProps: ({ refKey, ...rest }?: {
        refKey?: string | undefined;
    }) => {
        onKeyDown: (event: any) => void;
    };
    _handleOffsetChanged: (offset: number) => void;
    componentDidUpdate(prevProps: BaseDatePickerProps): void;
    render(): JSX.Element;
}
export default BaseDatePicker;
