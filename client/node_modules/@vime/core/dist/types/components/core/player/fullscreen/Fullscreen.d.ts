export declare class Fullscreen {
  private readonly el;
  private readonly listener;
  private disposal;
  private api;
  constructor(el: HTMLElement, listener: (isActive: boolean) => void);
  enterFullscreen(options?: FullscreenOptions): Promise<any>;
  exitFullscreen(): Promise<any>;
  get isActive(): boolean;
  get isSupported(): boolean;
  onFullscreenChange(): void;
  destroy(): void;
}
