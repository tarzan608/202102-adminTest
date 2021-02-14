import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Avatar from './Avatar';

import './Header.css';

const Header = (userRefresh: any) => {
  const { loginData } = useSelector((state: any) => state.user);
  const [focusMenu, setFousMenu] = useState(
    window.location.pathname === '/'
      ? ''
      : window.location.pathname.substring(1, window.location.pathname.length)
  );

  const onHandleClick = (e: any) => {
    setFousMenu(e.key);
  };

  return (
    <>
      <div id="header">
        <Menu
          onClick={onHandleClick}
          selectedKeys={[focusMenu]}
          mode="horizontal"
        >
          <Menu.Item key="logo">
            <Link to="/user">
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                관리자
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="user">
            <Link to="/user">회원관리</Link>
          </Menu.Item>
          <Menu.Item key="store">
            <Link to="/store">상점관리</Link>
          </Menu.Item>
          <Menu.Item key="product">
            <Link to="/product">상품관리</Link>
          </Menu.Item>
          {!loginData.data.data.store ? (
            <Menu.Item key="admin">
              <Link to="/admin">관리자관리</Link>
            </Menu.Item>
          ) : null}
        </Menu>
        <div className="header-avatar">
          <Avatar
            userRefresh={(res: any) => {
              console.log('들어왔다!', res);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
