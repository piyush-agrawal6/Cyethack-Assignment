import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  MdOutlineDashboard,
  MdOutlineFormatListBulleted,
  MdOutlineLogout,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/action";
import userimg from "../../assets/user.png";

const { Header, Sider, Content } = Layout;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const user = useSelector((store) => store.auth.user);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      localStorage.removeItem("key");
      navigate("/login");
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh", position: "fixed", left: 0, top: 0 }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img style={{ width: "50px", padding: "10px" }} src={logo} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[localStorage.getItem("key") || "1"]}
          items={[
            {
              key: "1",
              icon: <MdOutlineDashboard />,
              label: (
                <Link
                  to="/dashboard"
                  onClick={() => localStorage.setItem("key", "1")}
                >
                  Dashboard
                </Link>
              ),
            },
            {
              key: "2",
              icon: <MdOutlineFormatListBulleted />,
              label: (
                <Link
                  to="/list"
                  onClick={() => localStorage.setItem("key", "2")}
                >
                  List
                </Link>
              ),
            },
            {
              key: "3",
              icon: <MdOutlineLogout />,
              label: <p onClick={handleLogout}>Logout</p>, // Use handleLogout function
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px", // Ensure the height is fixed
            position: "fixed", // Fix the position of the Header
            top: 0,
            left: collapsed ? 80 : 200, // Adjust for Sider
            right: 0, // Ensure it stretches to the right edge
            zIndex: 1, // Ensure it stays above Content
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "25px",
              gap: "10px",
            }}
          >
            <p style={{ fontWeight: "600" }}>{user?.email}</p>
            <div
              style={{
                width: "37px",
                height: "37px",
              }}
            >
              <img
                style={{
                  width: "100%",
                }}
                src={userimg}
              />
            </div>
          </div>
        </Header>
        <Layout
          style={{
            marginTop: "64px", // Offset for Header height
            minHeight: "calc(100vh - 64px)", // Ensure the content area fits the rest of the viewport
          }}
        >
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowY: "auto", // Enable vertical scrolling for content
            }}
          >
            <Outlet /> {/* Render the matched child routes here */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Navbar;
