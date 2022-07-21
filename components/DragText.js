import React from "react";
import { Card, Row, Col } from "antd";
import { useDrag } from "react-dnd";
import { DRAG_TYPES } from "../constants/DragTypes";
import { MenuOutlined } from "@ant-design/icons";

export default function DraggableComponent({ ...props }) {
  const [, drag] = useDrag({
    item: {
      id: "ComponentText",
      props: { note: "from drag component" },
    },
    type: DRAG_TYPES.PARAGRAPH,
  });
  return (
    <Card
      ref={drag}
      bordered={true}
      {...props}
      style={{ border: "1px solid gray", margin: "0.5rem 0.5rem", borderRadius:'.5rem' }}
    >
      <Col span={24}>
        <Row align="center">
          <MenuOutlined style={{ fontSize: "330%" }} />
        </Row>
        <Row align="center">
          {props.name ? props.name : "Paragraph Component"}
        </Row>
      </Col>
    </Card>
  );
}
