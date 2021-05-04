import AlignStrategy from "./align-strategy";
import CollisionStrategy from "./collision-strategy";
import MarginSettings from "./margin-settings";
import Rect from "./rect";
import ViewPort from "./view-port";

interface PositionSettings {
    anchorRect: Rect;
    anchorAlign: AlignStrategy;
    elementRect: Rect;
    elementAlign: AlignStrategy;
    collisions: CollisionStrategy;
    margin?: MarginSettings;
    viewPort: ViewPort;
}

export default PositionSettings;
