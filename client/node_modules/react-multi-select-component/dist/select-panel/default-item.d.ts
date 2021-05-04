/// <reference types="react" />
import { Option } from "../lib/interfaces";
interface IDefaultItemRendererProps {
    checked: boolean;
    option: Option;
    disabled?: boolean;
    onClick: any;
}
declare const DefaultItemRenderer: ({ checked, option, onClick, disabled, }: IDefaultItemRendererProps) => JSX.Element;
export default DefaultItemRenderer;
