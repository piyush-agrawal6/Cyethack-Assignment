import React from "react";
import { Drawer, Form, Input, InputNumber, notification } from "antd";

const AddItemDrawer = ({ open, onClose, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Drawer
      title="Add new Item"
      width={420}
      onClose={onClose}
      open={open}
      style={{ paddingBottom: 80 }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter user name" }]}
        >
          <Input placeholder="Please enter user name" />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: "Please enter age" }]}
        >
          <InputNumber
            placeholder="Please enter age"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input placeholder="Please enter address" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={3} placeholder="Please enter description" />
        </Form.Item>

        <Form.Item
          name="tags"
          label="Tags"
          rules={[
            { required: true, message: "Please enter tags (comma separated)" },
          ]}
        >
          <Input placeholder="e.g., tag1, tag2, tag3" />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            style={{
              float: "right",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "7px 15px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Add
          </button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddItemDrawer;
