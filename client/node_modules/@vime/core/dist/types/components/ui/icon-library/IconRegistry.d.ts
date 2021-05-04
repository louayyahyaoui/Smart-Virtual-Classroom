/**
 * INSPIRED BY: https://github.com/shoelace-style/shoelace/blob/next/src/components/icon-library/icon-library-registry.ts
 */
export declare type IconLibraryResolver = (name: string) => string;
export declare const ICONS_BASE_CDN_URL: string;
export declare function withIconRegistry(component: any): void;
export declare const getIconLibraryResolver: (name: string) => IconLibraryResolver | undefined;
export declare function registerIconLibrary(name: string, resolver?: IconLibraryResolver): void;
export declare function deregisterIconLibrary(name: string): void;
