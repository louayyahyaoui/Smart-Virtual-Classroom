export declare class LazyLoader {
  private el;
  private attributes;
  private onLoad?;
  private intersectionObs?;
  private mutationObs?;
  private hasLoaded;
  constructor(el: HTMLElement, attributes: string[], onLoad?: ((el: HTMLElement) => void) | undefined);
  didLoad(): boolean;
  destroy(): void;
  private canObserveIntersection;
  private canObserveMutations;
  private lazyLoad;
  private onIntersection;
  onMutation(): void;
  private getLazyElements;
  private load;
  private loadEl;
}
