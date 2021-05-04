export declare class DelayedActionManager {
    private actionTimeout;
    private actionTimeoutId;
    private actionStartTime;
    private action;
    constructor(action: () => void);
    reset(): void;
    start(timeout: number): void;
    executeIfTimerExpired(): void;
    executeAction(): void;
    stop(): void;
    readonly actionExecuted: boolean;
}
//# sourceMappingURL=delayed-manager.d.ts.map
