import React from 'react';
import { BasicDatePickerProps } from '../types';
declare class DatePicker extends React.Component<BasicDatePickerProps> {
    _handleOnDateSelected: ({ selectable, date }: {
        selectable: any;
        date: any;
    }, event: React.SyntheticEvent) => void;
    render(): JSX.Element;
}
export default DatePicker;
