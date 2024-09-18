import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin, FloatButton, notification } from "antd";
import ListTable from "../../components/ListComponents/ListTable";
import AddItemDrawer from "../../components/ListComponents/AddItemDrawer";
import { addListItem, fetchList } from "../../redux/list/action";
import { IoMdAdd } from "react-icons/io";

const List = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((store) => store.list);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, navigate]);

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
      <ListTable data={list} handleView={handleView} />
      <FloatButton
        icon={<IoMdAdd />}
        type="primary"
        style={{
          insetInlineEnd: 50,
        }}
        tooltip={<p>Add item</p>}
        onClick={showDrawer}
      />
      <AddItemDrawer open={open} onClose={onClose} onFinish={onFinish} />
    </div>
  );
};

export default List;
