export declare class DomEventHandlersHolder {
    private handlers;
    addListener(element: Element | Document, eventName: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    addListenerToWindow(eventName: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    addListenerToDocument(eventName: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeAllListeners(): void;
}
//# sourceMappingURL=event-handlers-holder.d.ts.map
