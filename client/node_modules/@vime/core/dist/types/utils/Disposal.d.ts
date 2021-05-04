export declare class Disposal {
  private dispose;
  constructor(dispose?: (() => void)[]);
  add(callback: () => void): void;
  empty(): void;
}
