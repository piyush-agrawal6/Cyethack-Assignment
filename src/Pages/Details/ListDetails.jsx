import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, Card, notification } from "antd";
import axios from "axios";

const ListDetails = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    const fetchItem = async () => {
      const itemId = sessionStorage.getItem("item_id");

      if (!itemId) {
        navigate("/list");
        return;
      }

      // Retrieve cached items and parse them
      const cachedItems = JSON.parse(sessionStorage.getItem("items")) || [];

      // Check if the item is in the cache
      const cachedItem = cachedItems.find((item) => item._id === itemId);
      if (cachedItem) {
        setItem(cachedItem);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${URL}/list/get/${itemId}`);
        const itemData = response.data;

        // Update cache with the new item
        const updatedItems = [...cachedItems, itemData];
        sessionStorage.setItem("items", JSON.stringify(updatedItems));

        setItem(itemData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch item details");
        setLoading(false);
        notification.error({ message: "Failed to fetch item details" });
      }
    };

    fetchItem();
  }, [navigate, URL]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Card title="Item Details">
        <p>
          <strong>Name:</strong> {item.name}
        </p>
        <p>
          <strong>Age:</strong> {item.age}
        </p>
        <p>
          <strong>Address:</strong> {item.address}
        </p>
        <p>
          <strong>Description:</strong> {item.description}
        </p>
        <p>
          <strong>Tags:</strong> {item.tags.join(", ")}
        </p>
      </Card>
    </div>
  );
};

export default ListDetails;
