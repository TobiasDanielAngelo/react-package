import React from "react";
type Props = {
    onResult?: (text: string) => void;
};
export interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    abort(): void;
    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}
export interface SpeechRecognitionErrorEvent extends Event {
    error: "no-speech" | "aborted" | "audio-capture" | "network" | "not-allowed" | "service-not-allowed" | "bad-grammar" | "language-not-supported";
    message: string;
}
export interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}
export interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
    item(index: number): SpeechRecognitionResult;
}
export interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    length: number;
    isFinal: boolean;
    item(index: number): SpeechRecognitionAlternative;
}
export interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}
export declare const MySpeechRecognition: React.FC<Props>;
export {};
