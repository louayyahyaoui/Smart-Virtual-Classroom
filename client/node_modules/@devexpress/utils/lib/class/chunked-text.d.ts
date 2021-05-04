export declare class ChunkedText {
    protected maxChunkSize: number;
    protected chunks: string[];
    protected chunkIndex: number;
    protected chunk: string;
    protected chunkLength: number;
    protected posInChunk: number;
    protected _currPos: number;
    protected _textLength: number;
    constructor(text: string, maxChunkSize?: number);
    resetToStart(): void;
    resetToEnd(): void;
    addText(text: string): void;
    getText(): string;
    moveToNextChar(): boolean;
    moveToPrevChar(): boolean;
    setPositionTo(position: number): void;
    private setChunk;
    private pushText;
    readonly currChar: string;
    readonly currPos: number;
    readonly textLength: number;
}
//# sourceMappingURL=chunked-text.d.ts.map
