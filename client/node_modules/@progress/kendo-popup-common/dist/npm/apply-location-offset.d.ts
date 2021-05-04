import Rect from "./rect";
import OffsetPosition from "./offset-position";

declare var ApplyLocationOffset: (rect: Rect, location: OffsetPosition, isOffsetBody: boolean) => Rect;

export default ApplyLocationOffset;
