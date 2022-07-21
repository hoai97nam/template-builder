import React, { useCallback } from "react";
import { Row } from "antd";
export default function PreviewContainer({
  index,
  focused = false,
  onClick,
  children,
  ...restProps
}) {
  const clickHandler = useCallback(() => {
    onClick ? onClick(index) : null;
  }, [onClick ? onClick : null]);

  // const FocusedStyle = {
  //   border: "1px solid blue",
  //   borderRadius: "0.5rem",
  //   margin: "0 0.1rem",
  // };
  return (
    <div>
      <Row
        align="center"
        onClick={clickHandler}
        sx={{ border: focused && "1px solid blue" }}
        bordered={focused}
        {...restProps}
        // style={focused ? FocusedStyle : null}
      >
        {children}
      </Row>
    </div>
  );
}
