/// <reference types="react" />
import { Option } from "../lib/interfaces";
interface ISelectItemProps {
    itemRenderer: any;
    option: Option;
    checked?: boolean;
    tabIndex?: number;
    disabled?: boolean;
    onSelectionChanged: (checked: boolean) => void;
    onClick: any;
}
declare const SelectItem: ({ itemRenderer: ItemRenderer, option, checked, tabIndex, disabled, onSelectionChanged, onClick, }: ISelectItemProps) => JSX.Element;
export default SelectItem;
