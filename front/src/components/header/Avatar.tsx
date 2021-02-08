import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const HeaderAvatar = () => {
  const dispatch = useDispatch();
  const logoutClick = () => {
    dispatch({
      type: 'LOG_OUT_REQUEST',
    });
  };
  return (
    <>
      <div>
        <Dropdown
          trigger={['click']}
          placement="bottomRight"
          overlay={
            <Menu>
              <Menu.Item key="1">
                <a>개인정보수정</a>
              </Menu.Item>
              <Menu.Item key="2">
                <div onClick={logoutClick}>로그아웃</div>
              </Menu.Item>
            </Menu>
          }
        >
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </>
  );
};

export default HeaderAvatar;
