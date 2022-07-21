import React from "react";
import { Col, Row, Form, Button, Input } from "antd";

export default function EditButton({
  handleBtnTxt,
  handleBtnAlert,
  handleDelete,
}) {
  return (
    <>
      <Row>
        <Col span={12}>
          <Form
            name="button"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
          >
            <Form.Item label="Button Text" name="buttonText">
              <Input onChange={handleBtnTxt} />
            </Form.Item>
            <Form.Item label="Alert Messages" name="alertMessage">
              <Input onChange={handleBtnAlert} />
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
