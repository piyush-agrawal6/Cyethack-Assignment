import React, { useState } from "react";
import {
  Drawer,
  Form,
  Input,
  InputNumber,
  notification,
  Button,
  Spin,
} from "antd";

// function for adding new item
const AddItemDrawer = ({ open, onClose, onFinish }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 

  const handleFinish = async (values) => {
    setLoading(true); 
    try {
      await onFinish(values); 
      notification.success({
        message: "Success",
        description: "Item added successfully!",
      });
      form.resetFields(); 
      onClose(); 
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to add item. Please try again.",
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Drawer
      title="Add new Item"
      width={420}
      onClose={onClose}
      open={open}
      style={{ paddingBottom: 80 }}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
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
          <Button
            type="primary"
            htmlType="submit"
            loading={loading} // Show loading spinner when loading is true
            style={{
              float: "right",
              backgroundColor: "#4CAF50",
              borderColor: "#4CAF50",
              color: "white",
              borderRadius: "4px",
            }}
          >
            {loading ? <Spin size="small" /> : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddItemDrawer;
