import React from 'react';
import { RangeDatePickerProps } from '../types';
declare type RangeDatePickerState = {
    hoveredDate: Date | null;
};
declare class RangeDatePicker extends React.Component<RangeDatePickerProps, RangeDatePickerState> {
    static defaultProps: {
        selected: never[];
    };
    state: {
        hoveredDate: null;
    };
    setHoveredDate: (date: Date | null) => void;
    onMouseLeave: () => void;
    onHoverFocusDate(date: Date | null): void;
    _handleOnDateSelected: ({ selectable, date }: {
        selectable: any;
        date: any;
    }, event: React.SyntheticEvent) => void;
    getEnhancedDateProps: (getDateProps: any, dateBounds: any, { onMouseEnter, onFocus, ...restProps }: {
        [x: string]: any;
        onMouseEnter: any;
        onFocus: any;
    }) => any;
    getEnhancedRootProps: (getRootProps: any, props: any) => any;
    render(): JSX.Element;
}
export default RangeDatePicker;
