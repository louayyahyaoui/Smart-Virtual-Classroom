import React from 'react';
import { DateObj } from 'dayzed';
import { ButtonProps } from 'semantic-ui-react';
interface TodayButtonProps extends DateObj, ButtonProps {
    end?: boolean;
    hovered?: boolean;
    inRange?: boolean;
    start?: boolean;
}
declare const TodayButton: React.FC<TodayButtonProps>;
export default TodayButton;
