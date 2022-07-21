import React from "react";
import {Typography} from 'antd'

const { Paragraph } = Typography;

export default function ComponentName({ name, props }) {
  return (
    <Paragraph type="primary">
      {props.text ? props.text : "Test Component"}
    </Paragraph>
  );
}
