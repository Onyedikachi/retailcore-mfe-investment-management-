import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/scale-subtle.css";
import "tippy.js/animations/perspective-extreme.css";
import "tippy.js/animations/perspective-subtle.css";
import "tippy.js/animations/perspective.css";
import "tippy.js/animations/scale-extreme.css";

import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away-extreme.css";
import "tippy.js/animations/shift-away-subtle.css";

import "tippy.js/animations/shift-toward-extreme.css";
import "tippy.js/animations/shift-toward-subtle.css";
import "tippy.js/animations/shift-toward.css";

const Tooltip = ({
  children,
  content = "content",
  title,
  className = "!bg-transparent px-0 py-0",
  placement = "top",
  arrow = true,
  theme = "custom-light",
  animation = "shift-away",
  trigger = "mouseenter focus",
  interactive = false,
  allowHTML = false,
  maxWidth = 300,
  duration = 200,
}) => {
  return (
    <div className="flex items-end !bg-white">
      <Tippy
        content={content}
        placement={placement}
        arrow={arrow}
        theme={"light"}
        animation={animation}
        trigger={trigger}
        interactive={interactive}
        allowHTML={allowHTML}
        maxWidth={maxWidth}
        duration={duration}
      >
        {children ? (
          children
        ) : (
          <button type="button" className="bg-transparent p-0">
            {title}
          </button>
        )}
      </Tippy>
    </div>
  );
};

export default Tooltip;
