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
    userId: dataSource.userId,
    name: dataSource.name,
    email: dataSource.email,
    password: '',
    store: dataSource.store,
    code: dataSource.code,
  });

  const onFinish = (values: any) => {
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
            name="userId"
            label={
              <span>
                아이디&nbsp;
                <Tooltip title="아이디는 수정할 수 없습니다.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <span>
                비밀번호&nbsp;
                <Tooltip title="사용자 비밀번호">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="name"
            label={
              <span>
                이름&nbsp;
                <Tooltip title="사용자 이름">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '이름을 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <span>
                이메일&nbsp;
                <Tooltip title="사용자 이메일">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                type: 'email',
                required: true,
                message: '이메일 형식에 맞춰 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
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
