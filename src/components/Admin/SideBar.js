import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import "./SideBar.scss";
import { FaGem, FaGithub, } from 'react-icons/fa';
import "react-pro-sidebar/dist/scss/styles.scss";
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
       <ProSidebar
      image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        > <DiReact size={'3em'} color={'#00bfff'}/>
          <span>Huynh Phan</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<MdDashboard />}
          >
            <Link to="/admin" />
            Dashboard
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            icon={<FaGem />}
            title={"Features"}
          >
            <MenuItem>
            <NavLink to="manage-users"> Quản lý Users </NavLink> </MenuItem>
            <MenuItem> Quản lý bài Quiz</MenuItem>
            <MenuItem> Quản lý câu hỏi</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              SideBar Pro
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
    </>
  );
};
export default SideBar;
