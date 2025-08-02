import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
export const MyWebcam = () => {
    const webcamRef = useRef(null);
    const [facingMode, setFacingMode] = useState("user");
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    const toggleFacingMode = useCallback(() => {
        setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    }, []);
    const capture = () => {
        if (!webcamRef.current)
            return;
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
    };
    const videoConstraints = { facingMode };
    return (_jsxs("div", { children: [_jsx(Webcam, { audio: false, ref: webcamRef, screenshotFormat: "image/jpeg", videoConstraints: videoConstraints }, facingMode), isMobile && (_jsxs("button", { onClick: toggleFacingMode, children: ["Switch to ", facingMode === "user" ? "Back" : "Front", " Camera"] })), _jsx("button", { onClick: capture, children: "Capture" })] }));
};
