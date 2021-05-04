/// <reference types="dom-mediacapture-record" />
import { ReactElement } from "react";
export declare type ReactMediaRecorderRenderProps = {
    error: string;
    muteAudio: () => void;
    unMuteAudio: () => void;
    startRecording: () => void;
    pauseRecording: () => void;
    resumeRecording: () => void;
    stopRecording: () => void;
    mediaBlobUrl: null | string;
    status: StatusMessages;
    isAudioMuted: boolean;
    previewStream: MediaStream | null;
    clearBlobUrl: () => void;
};
export declare type ReactMediaRecorderHookProps = {
    audio?: boolean | MediaTrackConstraints;
    video?: boolean | MediaTrackConstraints;
    screen?: boolean;
    onStop?: (blobUrl: string, blob: Blob) => void;
    blobPropertyBag?: BlobPropertyBag;
    mediaRecorderOptions?: MediaRecorderOptions | null;
};
export declare type ReactMediaRecorderProps = ReactMediaRecorderHookProps & {
    render: (props: ReactMediaRecorderRenderProps) => ReactElement;
};
export declare type StatusMessages = "media_aborted" | "permission_denied" | "no_specified_media_found" | "media_in_use" | "invalid_media_constraints" | "no_constraints" | "recorder_error" | "idle" | "acquiring_media" | "delayed_start" | "recording" | "stopping" | "stopped";
export declare enum RecorderErrors {
    AbortError = "media_aborted",
    NotAllowedError = "permission_denied",
    NotFoundError = "no_specified_media_found",
    NotReadableError = "media_in_use",
    OverconstrainedError = "invalid_media_constraints",
    TypeError = "no_constraints",
    NONE = "",
    NO_RECORDER = "recorder_error"
}
export declare function useReactMediaRecorder({ audio, video, onStop, blobPropertyBag, screen, mediaRecorderOptions, }: ReactMediaRecorderHookProps): ReactMediaRecorderRenderProps;
export declare const ReactMediaRecorder: (props: ReactMediaRecorderProps) => ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
