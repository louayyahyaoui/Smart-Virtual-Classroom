/**
 * INSPIRED BY: https://github.com/shoelace-style/shoelace/blob/next/src/components/icon/request.ts
 */
export interface IconFile {
  ok: boolean;
  status: number;
  svg?: string;
}
export declare const requestIcon: (url: string) => Promise<IconFile> | undefined;
