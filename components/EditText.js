import React from "react";
import { Col, Row, Form, Button, Input } from "antd";

export default function EditText({
  handleTxt,
  handleDelete,
}) {
  return (
    <>
      <Row>
        <Col span={12}>
        <Form
            name="paragraph"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
          >
            <Form.Item label="Paragraph Text" name="buttonText">
              <Input onChange={handleTxt}/>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Button
            style={{ marginLeft: "4rem" }}
            type="danger"
            shape="round"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );
}
