import React from "react";
import { Table, Space, Tag, Input } from "antd";
import { AiFillDelete, AiFillEye } from "react-icons/ai";

const columns = (handleView) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search name"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <a onClick={() => confirm()} style={{ marginRight: 8 }}>
            Search
          </a>
          <a onClick={() => setSelectedKeys([])}>Reset</a>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search address"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <a onClick={() => confirm()} style={{ marginRight: 8 }}>
            Search
          </a>
          <a onClick={() => setSelectedKeys([])}>Reset</a>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record.address.toLowerCase().includes(value.toLowerCase()),
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

const ListTable = ({ data, handleView }) => {
  return (
    <Table
      columns={columns(handleView)}
      dataSource={data.map((item) => ({ ...item, key: item._id }))}
      pagination={{ pageSize: 6 }}
    />
  );
};

export default ListTable;
