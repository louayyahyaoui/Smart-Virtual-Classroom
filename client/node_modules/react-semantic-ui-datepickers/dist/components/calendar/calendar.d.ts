import React from 'react';
import { Locale, RenderProps, SemanticDatepickerProps } from 'types';
import './calendar.css';
interface CalendarProps extends RenderProps {
    filterDate: (date: Date) => boolean;
    getRootProps: () => Record<string, any>;
    inline: SemanticDatepickerProps['inline'];
    inverted: SemanticDatepickerProps['inverted'];
    maxDate?: Date;
    minDate?: Date;
    months: Locale['months'];
    nextMonth: string;
    nextYear: string;
    pointing: SemanticDatepickerProps['pointing'];
    previousMonth: string;
    previousYear: string;
    showToday: SemanticDatepickerProps['showToday'];
    todayButton: string;
    weekdays: Locale['weekdays'];
}
declare const Calendar: React.FC<CalendarProps>;
export default Calendar;
