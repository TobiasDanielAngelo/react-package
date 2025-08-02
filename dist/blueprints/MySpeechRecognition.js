import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
export const MySpeechRecognition = ({ onResult }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef(null);
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition ||
            window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("SpeechRecognition API not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            onResult?.(text);
        };
        recognition.onend = () => {
            setIsListening(false);
        };
        recognitionRef.current = recognition;
    }, [onResult]);
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };
    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };
    return (_jsxs("div", { className: "p-4 rounded-xl shadow-md", children: [_jsxs("div", { className: "mb-2", children: ["\uD83C\uDF99 Transcript: ", _jsx("span", { className: "font-semibold", children: transcript })] }), _jsxs("button", { onClick: isListening ? stopListening : startListening, className: `px-4 py-2 rounded ${isListening ? "bg-red-500" : "bg-green-500"} text-white`, children: [isListening ? "Stop" : "Start", " Listening"] })] }));
};
