import React from "react";
import { Card, Row, Col } from "antd";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "../constants/DragTypes";
import { RightOutlined } from "@ant-design/icons";

export default function DraggableButtonComponent({ ...props }) {
  const [, drag] = useDrag({
    item: {
      id: "ComponentButton",
      props: { note: "from drag component" },
    },
    type: DRAG_TYPES.BUTTON,
  });
  return (
    <Card
      ref={drag}
      bordered={true}
      style={{ border: "1px solid gray", margin: "0.5rem 0.5rem", borderRadius:'.5rem' }}
      {...props}
    >
      <Col>
        <Row align="center">
          <RightOutlined style={{ fontSize: "330%" }} />
        </Row>
        <Row align="center">{props.name ? props.name : "Button"}</Row>
      </Col>
    </Card>
  );
}
