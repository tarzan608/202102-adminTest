import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Avatar, Modal, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UpdateMain from './UpdateMain';
import { updateMemberAPI } from '../../api/MemberAPI';

const HeaderAvatar = (userRefresh: any) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState({
    updateUser: false, //개인정보 수정
  });
  const [confirmLoading, setConfirmLoading] = React.useState(false); //팝업 버튼 로딩
  const logoutClick = () => {
    dispatch({
      type: 'LOG_OUT_REQUEST',
    });
  };
  const upateClick = () => {
    setVisible({
      updateUser: true,
    });
  };
  const handleOk = async (data: any) => {
    await setConfirmLoading(true);
    await updateMemberAPI(data, async function () {
      await setConfirmLoading(false);
      await setVisible({ ...visible, updateUser: false });
      await userRefresh();
      message.success('수정되었습니다.');
    });
  };
  const handleCancel = React.useCallback(() => {
    setVisible({
      updateUser: false, //개인정보 수정
    });
    message.error('취소되었습니다.');
  }, [visible]);
  return (
    <>
      <div>
        <Modal
          title="개인정보 수정"
          visible={visible.updateUser}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          destroyOnClose={true}
        >
          <UpdateMain
            onUpdate={(data: any) => {
              handleOk(data);
            }}
          />
        </Modal>
        <Dropdown
          trigger={['click']}
          placement="bottomRight"
          overlay={
            <Menu>
              <Menu.Item key="1">
                <div onClick={upateClick}>개인정보수정</div>
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
