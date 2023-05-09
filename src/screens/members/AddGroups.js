import React from 'react';
import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Tooltip, Form, Input, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
// import { useParams } from 'react-router-dom';
import endpoint from '../../utils/endpoint';
import { getErrorAlert } from 'helpers/utils';
import Loading from 'components/loading';
import handleError from 'utils/handleError';
import { setMemberMenuData } from 'redux/slices/currentDataSlice';
import { Button } from 'react-bootstrap';
import TabGroups from './TabGroups';

const { Title, Paragraph } = Typography;
const btnQuestion = {
  backgroundColor: '#359DD9',
  borderRadius: '50%',
  border: 'none',
  color: 'white',
  fontSize: '21px',
  float: 'right'
};
const inputBorderRadius = { borderRadius: '15px' };

function AddGroups() {
  const dispatch = useDispatch();
  const _isMounted = useRef(false);
  // let { routeKey } = useParams();
  const [loadingSchema, setLoadingSchema] = useState(true);
  const [layoutData, setLayoutData] = useState(null);
  const initPageModule = async () => {
    try {
      // default part
      _isMounted.current && setLoadingSchema(true);
      const ep = endpoint.getDataManagerGroupSchemaEndpoint('add');
      const moduleSchemaRes = await Axios.get(ep);
      let schema = moduleSchemaRes.data;
      console.log('menuSchema:->', schema);
      let layoutSchema = schema.layout;
      console.log(schema.menu, ' schema.menu schema.menu schema.menu');
      dispatch(setMemberMenuData({ currentMemberMenuSchema: schema.menu })); // store current member menu
      _isMounted.current && setLayoutData(layoutSchema);
      // end default part
    } catch (error) {
      handleError(error, true);
    } finally {
      _isMounted.current && setLoadingSchema(false);
    }
  };

  useEffect(() => {
    _isMounted.current = true;
    initPageModule();
    return () => {
      _isMounted.current = false;
    };
  }, []);

  if (loadingSchema) {
    return <Loading style={{ marginTop: 150 }} msg="Loading Schema..." />;
  }
  if (!layoutData) return getErrorAlert({ onRetry: initPageModule });

  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row className="mx-4">
        <Col span={24}>
          <Title level={4} className="mb-3">
            Add a group tier
          </Title>
        </Col>
      </Row>
      <Row className="mx-4">
        <Col span={24}>
          <Form
            name="basic"
            labelCol={{
              span: 0
            }}
            wrapperCol={{
              span: 24
            }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Paragraph className="mb-2">Name</Paragraph>
            <Row>
              <Col xs={21} lg={23}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Name!'
                    }
                  ]}
                >
                  <Input placeholder="Name" style={inputBorderRadius} />
                </Form.Item>
              </Col>
            </Row>
            <Paragraph className="mb-2">Code</Paragraph>
            <Row>
              <Col xs={21} lg={23}>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Code!'
                    }
                  ]}
                >
                  <Input placeholder="Code" style={inputBorderRadius} />
                </Form.Item>
              </Col>
              <Col sm={3} lg={1}>
                <Tooltip placement="right" title="Code" color="#359dd9">
                  <QuestionCircleOutlined
                    className="mt-1"
                    style={btnQuestion}
                  />
                </Tooltip>
              </Col>
            </Row>

            <Button
              variant="outline-primary"
              className="rounded-pill mt-2 px-5"
              type="submit"
            >
              Add
            </Button>
          </Form>
        </Col>
      </Row>
      <TabGroups />
    </>
  );
}
export default AddGroups;
