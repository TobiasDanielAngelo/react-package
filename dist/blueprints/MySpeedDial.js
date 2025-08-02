import { jsx as _jsx } from "react/jsx-runtime";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { MyIcon } from "./MyIcon";
export const MySpeedDial = (props) => {
    const { actions, leftSide } = props;
    return (_jsx(SpeedDial, { hidden: !actions ||
            actions.filter((s) => (s.hidden ? !s.hidden : true)).length === 0, ariaLabel: "", sx: {
            position: "fixed",
            bottom: 25,
            left: leftSide ? 25 : undefined,
            right: leftSide ? undefined : 25,
            zIndex: 1,
        }, FabProps: {
            sx: {
                bgcolor: "teal",
                "&:hover": {
                    bgcolor: "secondary.main",
                },
                padding: 4,
            },
        }, icon: _jsx(SpeedDialIcon, { icon: _jsx(MyIcon, { icon: leftSide ? "DisplaySettings" : "Star" }), sx: { transform: "scale(1.5)" } }), children: actions?.map((action) => !action.hidden && (_jsx(SpeedDialAction, { tooltipTitle: action.name, icon: action.icon, onClick: action.onClick, sx: {
                padding: 4,
            } }, action.name))) }));
};
