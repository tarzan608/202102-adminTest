import * as React from 'react';
import { Form, Input, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

const UpdateMain = (props: any) => {
  const { onUpdate, dataSource } = props;
  const [form] = Form.useForm();
  const [detailData, setDetailData] = React.useState({
    storeId: dataSource.storeId,
    storeName: dataSource.storeName,
    userName: dataSource.userName,
    address: dataSource.address,
    tel: dataSource.tel,
    businessNum: dataSource.businessNum,
  });

  const onFinish = (values: any) => {
    values.storeId = detailData.storeId;
    onUpdate(values);
  };

  return (
    <>
      <div id="updateMain-container">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={detailData}
          scrollToFirstError
        >
          <Form.Item
            name="storeName"
            label={
              <span>
                상점명&nbsp;
                <Tooltip title="상점명은 수정할 수 없습니다.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="userName"
            label={
              <span>
                대표자명&nbsp;
                <Tooltip title="대표자명">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '대표자를 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label={
              <span>
                주소&nbsp;
                <Tooltip title="상점 주소">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '주소를 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tel"
            label={
              <span>
                전화번호&nbsp;
                <Tooltip title="전화번호를 입력해주세요.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '전화번호를 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="businessNum"
            label={
              <span>
                사업자번호&nbsp;
                <Tooltip title="사업자번호를 입력해주세요.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '사업자번호를 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item name="submit-btn">
            <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
              수정
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateMain;
