import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Statistic, Typography, Divider, Spin } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { fetchList } from "../../redux/list/action";

const { Title } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((store) => store.list);
  const [data, setData] = useState({
    totalItems: 0,
    averageAge: 0,
    tagsCount: {},
    ageDistribution: [],
    tableData: [],
  });

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (list) {
      const processedData = processData(list);
      setData(processedData);
    }
  }, [list]);

  const processData = (list) => {
    const totalItems = list.length;
    const averageAge = totalItems
      ? list.reduce((sum, item) => sum + (item.age || 0), 0) / totalItems
      : 0;
    const tagsCount = list.reduce((acc, item) => {
      (item.tags || []).forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    const ageDistribution = list.reduce((acc, item) => {
      const age = item.age || 0;
      acc[age] = (acc[age] || 0) + 1;
      return acc;
    }, {});

    const tableData = list.map((item, index) => ({
      key: index,
      name: item.name,
      age: item.age,
      address: item.address,
      description: item.description,
      tags: item.tags.join(", "),
    }));

    return {
      totalItems,
      averageAge,
      tagsCount,
      ageDistribution: Object.entries(ageDistribution).map(([age, count]) => ({
        age,
        count,
      })),
      tableData,
    };
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { totalItems, averageAge, tagsCount, ageDistribution, tableData } =
    data;

  const tagBarChartData = Object.entries(tagsCount).map(([tag, count]) => ({
    tag,
    count,
  }));

  const ageBarChartData = ageDistribution.map(({ age, count }) => ({
    age,
    count,
  }));


  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Items" value={totalItems} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Average Age" value={averageAge.toFixed(2)} />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Title level={4}>Tags Distribution</Title>
            {totalItems ? (
              <BarChart width={600} height={300} data={tagBarChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tag" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            ) : (
              <p>No Data</p>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={4}>Age Distribution</Title>
            {totalItems ? (
              <BarChart width={600} height={300} data={ageBarChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            ) : (
              <p>No Data</p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
