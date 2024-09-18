import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Space,
  Table,
  Tag,
  Spin,
  FloatButton,
  notification,
  Drawer,
  Form,
  Input,
  InputNumber,
} from "antd";
import { AiFillEye } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import "./List.css";
import { addListItem, fetchList } from "../../redux/list/action";

const columns = (handleView) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <AiFillEye
          onClick={() => handleView(record._id)}
          style={{ cursor: "pointer", color: "#1890ff" }}
        />
      </Space>
    ),
  },
];

const List = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { list, loading, error } = useSelector((store) => store.list);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields(); // Reset form on close
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchList());
    }
  }, [token, dispatch, navigate]);

  const onFinish = (values) => {
    const uniqueTags = [
      ...new Set(values.tags.split(",").map((tag) => tag.trim())),
    ];
    dispatch(addListItem({ ...values, tags: uniqueTags }))
      .then(() => {
        notification.success({ message: "Item added successfully" });
        onClose(); // Close the drawer after successful submission
      })
      .catch(() => {
        notification.error({ message: "Failed to add item" });
      });
  };

  const handleView = (itemId) => {
    sessionStorage.setItem("item_id", itemId);
    navigate("/list/details");
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="list">
      <Table
        columns={columns(handleView)}
        dataSource={list.map((item) => ({ ...item, key: item._id }))}
        pagination={{ pageSize: "6" }}
      />
      <FloatButton
        icon={<IoMdAdd />}
        type="primary"
        style={{
          insetInlineEnd: 50,
        }}
        tooltip={<p>Add item</p>}
        onClick={showDrawer}
      />
      <Drawer
        title="Add new Item"
        width={420}
        onClose={onClose}
        open={open}
        style={{
          paddingBottom: 80,
        }}
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
              {
                required: true,
                message: "Please enter tags (comma separated)",
              },
            ]}
          >
            <Input placeholder="e.g., tag1, tag2, tag3" />
          </Form.Item>

          <Form.Item>
            <button type="submit" style={{ float: "right" }}>
              Add
            </button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default List;
