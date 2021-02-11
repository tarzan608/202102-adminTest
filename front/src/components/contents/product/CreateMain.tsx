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
    values.productId =
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
            name="name"
            label={
              <span>
                상품명&nbsp;
                <Tooltip title="상품명">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '상품명을 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label={
              <span>
                가격&nbsp;
                <Tooltip title="상품가격을 입력해주세요.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discount"
            label={
              <span>
                할인&nbsp;
                <Tooltip title="할인">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '할인',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label={
              <span>
                내용&nbsp;
                <Tooltip title="상품정보">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '상품정보를 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brand"
            label={
              <span>
                상호&nbsp;
                <Tooltip title="상호를 입력해주세요.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '상호를 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label={
              <span>
                카테고리&nbsp;
                <Tooltip title="카테고리를 입력해주세요.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '카테고리를 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tag"
            label={
              <span>
                태그&nbsp;
                <Tooltip title="태그를 입력해주세요.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '태그를 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label={
              <span>
                수량&nbsp;
                <Tooltip title="수량을 입력해주세요.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '수량을 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label={
              <span>
                이미지&nbsp;
                <Tooltip title="대표 이미지를 넣어주세요.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '대표 이미지를 넣어주세요.',
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
