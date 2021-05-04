import * as React from 'react';
import { BlockProps, EllipsisConfig } from './Base';
export interface TextProps extends BlockProps {
    ellipsis?: boolean | Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'>;
}
declare const Text: React.FC<TextProps>;
export default Text;
