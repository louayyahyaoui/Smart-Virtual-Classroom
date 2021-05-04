import Rect from "./rect";
import AlignStrategy from "./align-strategy";
import MarginSettins from "./margin-settings";

interface AlignSettings {
    anchorRect: Rect;
    anchorAlign: AlignStrategy;
    elementRect: Rect;
    elementAlign: AlignStrategy;
    margin?: MarginSettins;
}

export default AlignSettings;
