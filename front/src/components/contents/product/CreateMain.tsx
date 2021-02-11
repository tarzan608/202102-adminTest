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

  const onFinish = (values: any) => {
    values.storeId =
      Math.random().toString(36).substr(2, 11) +
      Math.random().toString(36).substr(2, 11);
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
          scrollToFirstError
        >
          <Form.Item
            name="storeName"
            label={
              <span>
                상점명&nbsp;
                <Tooltip title="상점명">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '상점명을 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="storeCode"
            label={
              <span>
                가입코드&nbsp;
                <Tooltip title="상점 관리자 가입시 사용할 코드">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input />
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
            <Input />
          </Form.Item>
          <Form.Item name="submit-btn">
            <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
              추가
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateMain;
