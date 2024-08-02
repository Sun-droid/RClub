import React from "react";
import PropTypes from "prop-types";
import {ITooltip} from "@/app/types/types";

const Tooltip = ({content, disabled, init_enabled, children}: ITooltip) => {
    return (
        <div className="tooltipContainer">
            <div className={`tooltip${(init_enabled ? " init_enabled" : (disabled ? " disabled" : ""))}`}>
                {content}
            </div>
            {children}
        </div>
    );
};
Tooltip.propTypes = {
    content: PropTypes.string.isRequired,
    tooltipRef: PropTypes.object,
    disabled: PropTypes.bool.isRequired
};
export default Tooltip;