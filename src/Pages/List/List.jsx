import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Spin, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./List.css";
import {
  fetchList,
  editListItem,
  deleteListItem,
} from "../../redux/list/action";

const { confirm } = Modal;

const columns = () => [
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
        <AiFillEye style={{ cursor: "pointer", color: "#1890ff" }} />
        <AiFillEdit style={{ cursor: "pointer", color: "#faad14" }} />
        <AiFillDelete style={{ cursor: "pointer", color: "#f5222d" }} />
      </Space>
    ),
  },
];

const List = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { list, loading, error } = useSelector((store) => store.list);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchList());
    }
  }, [token, dispatch, navigate]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="list">
      <Table
        columns={columns()}
        dataSource={list.map((item) => ({ ...item, key: item._id }))}
      />
    </div>
  );
};

export default List;
