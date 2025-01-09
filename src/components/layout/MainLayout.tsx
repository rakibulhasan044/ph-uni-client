import { Layout, Menu } from "antd";
import {  Outlet } from "react-router-dom";
import { adminSidebarItems } from "../../routes/admin.routes";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: 'gray' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
       <div style={{ color: 'white', height: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1>PH-uni</h1>
       </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={adminSidebarItems}
        />
      </Sider>
      <Layout style={{ backgroundImage: 'gray'}}>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", backgroundColor: 'gray' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
