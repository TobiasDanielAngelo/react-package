import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
export const MyNotification = () => {
    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("Hello!", {
                        body: "This is a local push notification.",
                        // icon: "/icon.png", // optional
                    });
                }
            });
        }
    }, []);
    return _jsx(_Fragment, {});
};
