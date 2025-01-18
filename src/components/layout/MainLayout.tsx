import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hook";
import { logout } from "../../redux/feature/auth/authSlice";

const { Header, Content } = Layout;

const MainLayout = () => {

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <Layout style={{ minHeight: "100%", backgroundColor: "gray" }}>
      <Sidebar />
      <Layout style={{ backgroundImage: "gray" }}>
        <Header> <Button onClick={handleLogout}>Logout</Button></Header>
        <Content style={{ margin: "24px 16px 0", backgroundColor: "gray" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
