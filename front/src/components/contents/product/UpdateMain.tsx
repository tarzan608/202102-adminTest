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
    productId: dataSource.productId,
    name: dataSource.name,
    price: dataSource.price,
    content: dataSource.content,
    brand: dataSource.brand,
    category: dataSource.category,
    tag: dataSource.tag,
    quantity: dataSource.quantity,
    image: dataSource.image,
  });

  const onFinish = (values: any) => {
    values.productId = detailData.productId;
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
            name="name"
            label={
              <span>
                상품명&nbsp;
                <Tooltip title="상품명은 수정할 수 없습니다.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
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
                message: '내용를 입력해주세요.',
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
                <Tooltip title="이미지를 입력해주세요.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '이미지를 입력해주세요.',
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
