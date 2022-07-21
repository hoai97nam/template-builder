import React from "react";
import { Button } from "antd";

export default function ComponentButton({ name, props }) {
  const buttonClick = () => {
    alert(props.message ? props.message : "default alert");
  };
  return (
    <Button type="primary" shape="round" onClick={buttonClick}>
      {props.text ? props.text : "Button Component"}
    </Button>
  );
}
