interface DraggableOptions {
    press?: Function;
    drag?: Function;
    release?: Function;
    mouseOnly?: boolean;
}

export default class Draggable {
    constructor(options?: DraggableOptions);
    update(options?: DraggableOptions): void;
    bindTo(element: Element): void;
    destroy(): void;
}
