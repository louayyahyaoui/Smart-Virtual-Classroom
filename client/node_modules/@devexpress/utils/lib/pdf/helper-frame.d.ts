export declare class PdfHelperFrame {
    private readonly container;
    private readonly frameClassName;
    private helperFrame;
    private helperFrameName;
    constructor(container: HTMLElement, frameClassName: string);
    dispose(): void;
    showPrintDialog(resourceUrl: string): void;
    private getHelperFrame;
    private removeHelperFrame;
    private createHelperFrame;
    private getNewName;
}
//# sourceMappingURL=helper-frame.d.ts.map
