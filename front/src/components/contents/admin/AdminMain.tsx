import * as React from 'react';
import * as moment from 'moment';
import HeaderComponent from '../../header/Header';
import { Layout, Table, Input, Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './AdminMain.css';

import * as database from '../../../../db.json';

const { Header, Footer, Content } = Layout;
const { Search } = Input;
const { confirm } = Modal;

const columns = [
  {
    title: '아이디',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '상점명',
    dataIndex: 'store',
    key: 'store',
  },
  {
    title: '이메일',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '가입일',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    console.log(
      `선택된 키: ${selectedRowKeys}`,
      '선택된 데이터: ',
      selectedRows
    );
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const AdminMain = () => {
  const dataSource = database.userData.userList;
  const [list, setList] = React.useState(dataSource);
  const onSearch = (value: string) => console.log(value);
  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <div>정말 삭제하시겠습니까?</div>,
      onOk() {
        message.success('삭제되었습니다.');
      },
      onCancel() {
        // message.success('취소되었습니다.');
      },
    });
  };

  React.useEffect(() => {
    list.map((user: any) => {
      user.createdAt = moment(user.createdAt).format('YYYY-MM-DD');
    });
  }, []);

  return (
    <>
      <Layout>
        <Header>
          <HeaderComponent />
        </Header>
        <Content>
          <div id="user-container" className="admin-content">
            <div className="nav-box">
              <div className="nav-title">
                <h3>관리자관리</h3>
              </div>
            </div>
            <div className="content-box">
              <div className="content-search-box">
                <Search
                  placeholder="검색어를 입력해주세요"
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
                <Button onClick={showConfirm}>삭제하기</Button>
              </div>
              <div className="content-table-box">
                <Table
                  rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                  }}
                  dataSource={list}
                  columns={columns}
                  pagination={{ pageSize: 10 }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event: any) => {
                        console.log('회원관리 선택 ROW:', record);
                      }, // click row
                    };
                  }}
                />
              </div>
            </div>
          </div>
        </Content>
        <Footer>{/* <FooterComponent /> */}</Footer>
      </Layout>
    </>
  );
};

export default AdminMain;
