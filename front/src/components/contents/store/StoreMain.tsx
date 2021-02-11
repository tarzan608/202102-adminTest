import * as React from 'react';
import * as moment from 'moment';
import HeaderComponent from '../../header/Header';
import {
  storeListAPI,
  createStoreAPI,
  updateStoreAPI,
  deleteStoreAPI,
} from '../../../api/StoreAPI';
import CreateMain from './CreateMain';
import UpdateMain from './UpdateMain';
import { Layout, Table, Input, Button, Modal, message, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './StoreMain.css';

const { Header, Footer, Content } = Layout;
const { Search } = Input;
const { confirm } = Modal;
const { Column } = Table;

const StoreMain = () => {
  const [list, setList] = React.useState();
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
      disabled: record.name === 'Disabled Store', // Column configuration not to be checked
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
    createStore: false,
    updateStore: false, //사용자 수정
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
      case 'createStore': // 상점 수정
        setVisible({ ...visible, createStore: true });
        break;
      case 'updateStore': // 상점 수정
        setUpdateDATA(record);
        setVisible({ ...visible, updateStore: true });
        break;
      case 'deleteStore':
        confirm({
          icon: <ExclamationCircleOutlined />,
          content: <div>정말 삭제하시겠습니까?</div>,
          onOk() {
            deleteStoreAPI(checkData, async function (res: any) {
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
        case 'createStore':
          createStoreAPI(data, async function () {
            await setConfirmLoading(false);
            await setVisible({ ...visible, createStore: false });
            await setRefresh(!refresh);
          });
          message.success('성공적으로 수정되었습니다.');
          break; //상점 수정

        case 'updateStore':
          updateStoreAPI(data, async function () {
            await setConfirmLoading(false);
            await setVisible({ ...visible, updateStore: false });
            await setRefresh(!refresh);
          });
          message.success('성공적으로 수정되었습니다.');
          break; //상점 수정

        default:
          break;
      }
    },
    [visible]
  );

  const handleCancel = React.useCallback(() => {
    setVisible({
      createStore: false,
      updateStore: false, //상점 수정
    });

    message.error('취소되었습니다.');
  }, [visible]);

  const updateMe = () => {
    setRefresh(!refresh);
  };

  React.useEffect(() => {
    storeListAPI(option, async function (res: any, total: any) {
      await res.map((store: any) => {
        store.key = store.storeName;
        store.createdAt = moment(store.createdAt).format('YYYY-MM-DD');
      });
      await setTotal(total);

      // const sortList = res.filter((store:any) => store.status === '');

      setList(res);
    });
  }, [option, refresh]);

  return (
    <>
      <Layout>
        <Header>
          <HeaderComponent userRefresh={updateMe} />
        </Header>
        <Content>
          <div id="store-container" className="admin-content">
            <div className="nav-box">
              <div className="nav-title">
                <h3>상점관리</h3>
              </div>
            </div>
            <div className="content-box">
              <div className="content-search-box">
                <Search
                  placeholder="검색어를 입력해주세요"
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
                <Button onClick={() => showModal('createStore', 'test')}>
                  추가하기
                </Button>
                <Button onClick={() => showModal('deleteStore', 'test')}>
                  삭제하기
                </Button>
              </div>
              <div className="content-table-box">
                <Modal
                  title="상점 추가"
                  visible={visible.createStore}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  destroyOnClose={true}
                >
                  <CreateMain
                    onUpdate={(data: any) => {
                      handleOk('createStore', data);
                    }}
                    dataSource={updateDATA}
                  />
                </Modal>
                <Modal
                  title="상점 수정"
                  visible={visible.updateStore}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  destroyOnClose={true}
                >
                  <UpdateMain
                    onUpdate={(data: any) => {
                      handleOk('updateStore', data);
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
                        console.log('상점관리 선택 ROW:', record);
                      }, // click row
                    };
                  }}
                >
                  <Column
                    title="상점명"
                    dataIndex="storeName"
                    key="storeName"
                  />
                  <Column title="대표명" dataIndex="userName" key="userName" />
                  <Column title="주소" dataIndex="address" key="address" />
                  <Column title="전화번호" dataIndex="tel" key="tel" />
                  <Column
                    title="사업자번호"
                    dataIndex="businessNum"
                    key="businessNum"
                  />
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
                            console.log(
                              '텍스트 값: ',
                              text,
                              '데이터 값:',
                              record
                            );
                            showModal('updateStore', record);
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

export default StoreMain;
