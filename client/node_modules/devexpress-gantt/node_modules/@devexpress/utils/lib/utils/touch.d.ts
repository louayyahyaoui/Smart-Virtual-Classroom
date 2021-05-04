export declare class TouchUtils {
    static touchMouseDownEventName: string;
    static touchMouseUpEventName: string;
    static touchMouseMoveEventName: string;
    static msTouchDraggableClassName: string;
    static documentTouchHandlers: Record<string, EventListenerOrEventListenerObject[]>;
    static documentEventAttachingAllowed: boolean;
    static onEventAttachingToDocument(eventName: string, func: EventListenerOrEventListenerObject): boolean;
    static isTouchEventName(eventName: string): boolean;
    static isTouchEvent(evt: Event): evt is TouchEvent;
    static getEventX(evt: TouchEvent): number;
    static getEventY(evt: TouchEvent): number;
}
//# sourceMappingURL=touch.d.ts.map
