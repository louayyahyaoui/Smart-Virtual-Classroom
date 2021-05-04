export interface IBatchUpdatableObject {
    beginUpdate(): void;
    endUpdate(): void;
}
export interface IBatchUpdatableObjectExtend extends IBatchUpdatableObject {
    suspendUpdate(): void;
    continueUpdate(): void;
    isUpdateLocked(): boolean;
    onUpdateLocked(): void;
}
export declare abstract class BatchUpdatableObject implements IBatchUpdatableObjectExtend {
    private suspendUpdateCount;
    private occurredEvents;
    beginUpdate(): void;
    endUpdate(): void;
    suspendUpdate(): void;
    continueUpdate(): void;
    isUpdateLocked(): boolean;
    abstract onUpdateUnlocked(occurredEvents: number): void;
    onUpdateLocked(): void;
    registerOccurredEvent(eventMask: number): void;
    resetOccurredEvents(): void;
    isLocked(): boolean;
}
export declare class EmptyBatchUpdatableObject implements IBatchUpdatableObject {
    beginUpdate(): void;
    endUpdate(): void;
}
//# sourceMappingURL=batch-updatable.d.ts.map
