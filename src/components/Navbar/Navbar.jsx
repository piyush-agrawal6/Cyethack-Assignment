import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, notification, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  MdOutlineDashboard,
  MdOutlineFormatListBulleted,
  MdOutlineLogout,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/action";

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
      sessionStorage.removeItem("items");
      sessionStorage.removeItem("item_id");
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
              icon: <MdOutlineLogout onClick={handleLogout} />,
              label: <p onClick={handleLogout}>Logout</p>, 
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
            height: "64px", 
            position: "fixed", 
            top: 0,
            left: collapsed ? 80 : 200, 
            right: 0,
            zIndex: 1, 
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
          ></div>
        </Header>
        <Layout
          style={{
            marginTop: "64px", 
            minHeight: "calc(100vh - 64px)", 
          }}
        >
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowY: "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Navbar;
