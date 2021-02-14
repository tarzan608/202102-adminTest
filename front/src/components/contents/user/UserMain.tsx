import * as React from 'react';
import * as moment from 'moment';
import { useSelector } from 'react-redux';
import HeaderComponent from '../../header/Header';
import {
  memberListAPI,
  updateMemberAPI,
  deleteMemberAPI,
} from '../../../api/MemberAPI';
import UpdateMain from './UpdateMain';
import { Layout, Table, Input, Button, Modal, message, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './UserMain.css';

import * as database from '../../../../db.json';

const { Header, Footer, Content } = Layout;
const { Search } = Input;
const { confirm } = Modal;
const { Column } = Table;

const UserMain = () => {
  const dataSource = database.userData.userList;
  const { loginData } = useSelector((state: any) => state.user);
  const [list, setList] = React.useState(dataSource);
  const [total, setTotal] = React.useState();
  const [checkData, setCheckData] = React.useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `선택된 키: ${selectedRowKeys}`,
        '선택된 데이터: ',
        selectedRows
      );
      setCheckData(selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [option, setOption] = React.useState({
    page: {
      current: 1,
      pageSize: 10,
    },
    perPage: 10,
    search: '',
  });
  const [visible, setVisible] = React.useState({
    updateUser: false, //사용자 수정
  });
  const [refresh, setRefresh] = React.useState(false); //목록 다시 가져오기
  const [updateDATA, setUpdateDATA] = React.useState();
  const [confirmLoading, setConfirmLoading] = React.useState(false); //팝업 버튼 로딩
  const onSearch = (value: string) => {
    setOption({
      ...option,
      search: value,
    });
  };
  const onPageChange = (page: any) => {
    console.log('현재 페이지 값: ', page);
    setOption({
      ...option,
      page: page,
    });
  };

  const showModal = (mode: string, record: any) => {
    switch (mode) {
      case 'updateUser': // 사용자 수정
        setUpdateDATA(record);
        setVisible({ ...visible, updateUser: true });
        break;
      case 'deleteUser':
        confirm({
          icon: <ExclamationCircleOutlined />,
          content: <div>정말 삭제하시겠습니까?</div>,
          onOk() {
            deleteMemberAPI(checkData, async function (res: any) {
              await setRefresh(!refresh);
              await message.success('삭제되었습니다.');
            });
          },
          onCancel() {
            // message.success('취소되었습니다.');
          },
        });
    }
  };

  const handleOk = React.useCallback(
    (mode, data) => {
      setConfirmLoading(true);

      switch (mode) {
        case 'updateUser':
          updateMemberAPI(data, async function () {
            await setConfirmLoading(false);
            await setVisible({ ...visible, updateUser: false });
            await setRefresh(!refresh);
          });
          message.success('성공적으로 수정되었습니다.');
          break; //이용기관 수정

        default:
          break;
      }
    },
    [visible]
  );

  const handleCancel = React.useCallback(() => {
    setVisible({
      updateUser: false, //회원정보 수정
    });

    message.error('취소되었습니다.');
  }, [visible]);

  const updateMe = () => {
    setRefresh(!refresh);
  };

  React.useEffect(() => {
    memberListAPI(option, async function (res: any, total: any) {
      await res.map((user: any) => {
        user.key = user.userId;
        user.createdAt = moment(user.createdAt).format('YYYY-MM-DD');
      });
      await setTotal(total);

      if (!loginData.data.data.store) {
        setList(res);
      } else {
        const sortList = res.filter(
          (user: any) => user.store === loginData.data.data.store
        );
        setList(sortList);
      }
    });
  }, [option, refresh]);

  return (
    <>
      <Layout>
        <Header>
          <HeaderComponent userRefresh={updateMe} />
        </Header>
        <Content>
          <div id="user-container" className="admin-content">
            <div className="nav-box">
              <div className="nav-title">
                <h3>회원관리</h3>
              </div>
            </div>
            <div className="content-box">
              <div className="content-search-box">
                <Search
                  placeholder="검색어를 입력해주세요"
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
                <Button onClick={() => showModal('deleteUser', 'test')}>
                  삭제하기
                </Button>
              </div>
              <div className="content-table-box">
                <Modal
                  title="회원정보 수정"
                  visible={visible.updateUser}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  destroyOnClose={true}
                >
                  <UpdateMain
                    onUpdate={(data: any) => {
                      handleOk('updateUser', data);
                    }}
                    dataSource={updateDATA}
                  />
                </Modal>
                <Table
                  rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                  }}
                  dataSource={list}
                  pagination={{ pageSize: option.perPage, total: total }}
                  onChange={onPageChange}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event: any) => {
                        console.log('회원관리 선택 ROW:', record);
                      }, // click row
                    };
                  }}
                >
                  <Column title="아이디" dataIndex="userId" key="userId" />
                  <Column title="이름" dataIndex="name" key="name" />
                  <Column title="이메일" dataIndex="email" key="email" />
                  <Column
                    title="가입일"
                    dataIndex="createdAt"
                    key="createdAt"
                  />
                  <Column
                    title="설정"
                    key="setting"
                    render={(text, record) => (
                      <Space size="middle">
                        <a
                          onClick={() => {
                            showModal('updateUser', record);
                          }}
                        >
                          수정
                        </a>
                      </Space>
                    )}
                  />
                </Table>
              </div>
            </div>
          </div>
        </Content>
        <Footer>{/* <FooterComponent /> */}</Footer>
      </Layout>
    </>
  );
};

export default UserMain;
