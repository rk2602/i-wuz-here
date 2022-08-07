import "./Pin.css";
import React, { useState } from "react";
import point from "../../media/Logo-Pin.svg";
import { useLayer, Arrow } from "react-laag";

export default function Pin({ onClickCallback, ...props }) {
  const [isOpen, setOpen] = useState(false);
  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen,
    triggerOffset: 10,
    auto: true,
    overflowContainer: false,
    onOutsideClick: () => setOpen(false),
  });
  return (
    <div
      className="pin"
      {...triggerProps}
      onClick={() => {
        onClickCallback();
      }}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <img src={point} />
      {isOpen &&
        renderLayer(
          <span className="pin-content" {...layerProps}>
            {props.children}
            <Arrow {...arrowProps} />
          </span>
        )}
    </div>
  );
}
