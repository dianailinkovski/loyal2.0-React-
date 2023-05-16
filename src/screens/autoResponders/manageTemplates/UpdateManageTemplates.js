import React from 'react';
import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography,
  Form,
  // InputNumber,
  Input,
  Row,
  Col,
  message,
  Tooltip,
  Divider
} from 'antd';
import { useParams } from 'react-router-dom';
import endpoint from '../../../utils/endpoint';
import { getErrorAlert } from 'helpers/utils';
import Loading from 'components/loading';
import handleError from 'utils/handleError';
import { setMemberMenuData } from 'redux/slices/currentDataSlice';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const ToolTip = {
  background: 'rgb(53, 157, 217)',
  borderRadius: '50px',
  color: 'white',
  scale: '1.5'
  // marginLeft: '39em'
};
const inputBorderRadius = { borderRadius: '10px' };
// const inputNumberStyle = { borderRadius: '10px', width: '100%' };

function UpdateManageTemplates() {
  const dispatch = useDispatch();
  const _isMounted = useRef(false);
  const [form] = Form.useForm();
  let { routeKey, id } = useParams();
  const [loadingSchema, setLoadingSchema] = useState(true);
  const [layoutData, setLayoutData] = useState(null);
  const [branches, setBranches] = useState([]);
  const [branchISbb_loyal2_branchesID, set_branchISbb_loyal2_branchesID] =
    useState(null);
  const initPageModule = async () => {
    try {
      // default part
      _isMounted.current && setLoadingSchema(true);
      const ep = endpoint.getDataManageTemplateSchemaEndpoint(
        `${routeKey}/${id}`
      );
      const moduleSchemaRes = await Axios.get(ep);
      let schema = moduleSchemaRes.data;
      console.log('menuSchema:->', schema);
      let layoutSchema = schema.layout;
      console.log(schema.menu, ' schema.menu schema.menu schema.menu');
      dispatch(setMemberMenuData({ currentMemberMenuSchema: schema.menu })); // store current member menu
      const branchesList = await Axios.get(
        endpoint.getModuleDataEndpoint('bb_loyal2_branches')
      );
      setBranches(branchesList.data.list);
      set_branchISbb_loyal2_branchesID(
        layoutSchema.data[0][0].branchISbb_loyal2_branchesID
      );
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

  const onFinish = async values => {
    console.log('Success:', values);
    try {
      _isMounted.current && setLoadingSchema(true);
      const {
        _id,
        name
        // ownerISbb_usersID
        // transaction_date,
        // code,
        // points_usedNUM,
        // memberISbb_userID
      } = values;
      const addMember = await Axios.patch(
        endpoint.getDataAddEndpoint(`bb_loyal2_templates/${id}`),
        {
          _id,
          name,
          branchISbb_loyal2_branchesID
          // ownerISbb_usersID
          // transaction_date,
          // code,
          // points_usedNUM,
          // memberISbb_userID
        }
      );
      const user = addMember.data;
      if (user.error) return message.error(user.error);
      message.success('Updated successful!');
      initPageModule();
    } catch (error) {
      handleError(error, true);
    } finally {
      _isMounted.current && setLoadingSchema(false);
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const changeBranch = e => {
    set_branchISbb_loyal2_branchesID(e.target.value);
  };
  let FieldsData = layoutData.data[0];
  form.setFieldsValue({
    name: FieldsData[0].name,
    _id: FieldsData[0]._id
  });
  return (
    <>
      <Row className="mx-4 mt-3">
        <Col span={24}>
          <Title level={3}>Template Manager</Title>
        </Col>
      </Row>
      <Divider />
      <Row className="mx-4 mt-3">
        <Col span={24}>
          <Title level={4} className="mb-3">
            Add a custom template
          </Title>
        </Col>
      </Row>
      <Row className="mx-4 mt-3">
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
            form={form}
            autoComplete="off"
          >
            <Form.Item name="_id" hidden="hidden">
              <Input />
            </Form.Item>
            <Row align="middle">
              <Col span={20}>
                <Text strong className="text-label">
                  Type
                </Text>
              </Col>
              <Col span={4} style={{ textAlign: 'end' }}>
                <Tooltip title="Email template" placement="right">
                  <QuestionCircleOutlined style={ToolTip}>
                    ?
                  </QuestionCircleOutlined>
                </Tooltip>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col span={20}>
                <BootstrapForm.Select
                  placeholder="Select"
                  style={inputBorderRadius}
                >
                  <option value="0">Birthday</option>
                  <option value="1">Member Password Reset</option>
                  <option value="0">New Member</option>
                  <option value="1">Order Processed</option>
                  <option value="0">Refer A Friend</option>
                  <option value="1">Sales Upload Approved</option>
                  <option value="0">Sales Upload Declined</option>
                  <option value="1">Subscription Added</option>
                  <option value="0">Subscription Expired</option>
                  <option value="1">Subscription Expiring</option>
                  <option value="0">Voucher Expiry Warning</option>
                  <option value="1">Voucher Issued</option>
                  <option value="0">Voucher Request Confirmation</option>
                  <option value="1">Wish List/Registry Invite</option>
                  <option value="0">Birthday</option>
                  <option value="1">New Member</option>
                  <option value="0">Voucher Issued</option>
                  <option value="1">Standard Email Template</option>
                  <option value="0">Standard PDF Template</option>
                  <option value="1">Standard Text Template</option>
                  <option value="1"></option>
                </BootstrapForm.Select>
              </Col>
            </Row>
            <Row align="middle" className="mt-1">
              <Col span={20}>
                <Text strong className="text-label">
                  Name
                </Text>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col span={20}>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please input name' }]}
                >
                  <Input style={inputBorderRadius} />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle mt-1">
              <Col span={20}>
                <Text strong className="text-label">
                  Subject Template
                </Text>
              </Col>
              <Col span={4} style={{ textAlign: 'end' }}>
                <Tooltip title="Email template" placement="right">
                  <QuestionCircleOutlined style={ToolTip}>
                    ?
                  </QuestionCircleOutlined>
                </Tooltip>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col span={20}>
                <BootstrapForm.Select
                  placeholder="Select"
                  style={inputBorderRadius}
                >
                  <option value="0">Test</option>
                  <option value="1">Account Update Email</option>
                  <option value="2">Account Update Text/SMS</option>
                  <option value="3">Birthday Email</option>
                  <option value="4">Birthday Text/SMS</option>
                  <option value="5">Member Password Reset Link</option>
                  <option value="6">New Member Welcome Email</option>
                  <option value="7">New Member Welcome Text/SMS</option>
                  <option value="8">Order Processed Email</option>
                  <option value="9">Refer A Friend Email</option>
                  <option value="10">Sales Upload Approved</option>
                  <option value="11">Sales Upload Declined</option>
                  <option value="12">Sample PDF Template</option>
                  <option value="13">Subscription Added</option>
                  <option value="14">Subscription Expired</option>
                  <option value="15">Subscription Expiring</option>
                  <option value="16">Voucher Expiry Warning</option>
                  <option value="17">Voucher Issued Email</option>
                  <option value="18">Voucher Issued Text/SMS</option>
                  <option value="19">Voucher Request Confirmation</option>
                  <option value="20">Wish List/Registry Invite Email</option>
                </BootstrapForm.Select>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col span={20}>
                {' '}
                <Form.Item
                  name="textarea"
                  rules={[
                    { required: false, message: 'Please input textarea' }
                  ]}
                >
                  <Input.TextArea rows={3} style={inputBorderRadius} />
                </Form.Item>
              </Col>
            </Row>
            <Row className="mt-2">
              <Button
                variant="outline-primary"
                className="rounded-pill px-4 py-2"
              >
                View tag list
              </Button>
            </Row>
            <Row align="middle mt-3">
              <Col span={20}>
                <Text strong className="text-label">
                  Message Template
                </Text>
              </Col>
              <Col span={4} style={{ textAlign: 'end' }}>
                <Tooltip title="Email template" placement="right">
                  <QuestionCircleOutlined style={ToolTip}>
                    ?
                  </QuestionCircleOutlined>
                </Tooltip>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col span={20}>
                <BootstrapForm.Select
                  placeholder="Select"
                  style={inputBorderRadius}
                >
                  <option value="0">Test</option>
                  <option value="1">Account Update Email</option>
                  <option value="2">Account Update Text/SMS</option>
                  <option value="3">Birthday Email</option>
                  <option value="4">Birthday Text/SMS</option>
                  <option value="5">Member Password Reset Link</option>
                  <option value="6">New Member Welcome Email</option>
                  <option value="7">New Member Welcome Text/SMS</option>
                  <option value="8">Order Processed Email</option>
                  <option value="9">Refer A Friend Email</option>
                  <option value="10">Sales Upload Approved</option>
                  <option value="11">Sales Upload Declined</option>
                  <option value="12">Sample PDF Template</option>
                  <option value="13">Subscription Added</option>
                  <option value="14">Subscription Expired</option>
                  <option value="15">Subscription Expiring</option>
                  <option value="16">Voucher Expiry Warning</option>
                  <option value="17">Voucher Issued Email</option>
                  <option value="18">Voucher Issued Text/SMS</option>
                  <option value="19">Voucher Request Confirmation</option>
                  <option value="20">Wish List/Registry Invite Email</option>
                </BootstrapForm.Select>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col span={20}>
                {' '}
                <Form.Item
                  name="textarea"
                  rules={[
                    { required: false, message: 'Please input textarea' }
                  ]}
                >
                  <Input.TextArea rows={5} style={inputBorderRadius} />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle" className="mt-2">
              <Col span={10}>
                <Row>
                  <Col span={12}>
                    {' '}
                    <Button
                      variant="outline-primary"
                      className="rounded-pill px-4 py-2"
                    >
                      View tag list
                    </Button>
                  </Col>
                  <Col span={12}>
                    {' '}
                    <Button
                      variant="outline-dark"
                      className="rounded-pill px-4 py-2"
                    >
                      HTML editor
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={10}>
                <Row align="middle" gutter={[16, 16]}>
                  <Col span={10} style={{ textAlign: 'end' }}>
                    <Text strong className="text-label">
                      Branch
                    </Text>
                  </Col>
                  <Col span={14}>
                    <BootstrapForm.Select
                      style={inputBorderRadius}
                      defaultValue={branchISbb_loyal2_branchesID}
                      onChange={e => changeBranch(e)}
                    >
                      <option key={'null'} value={null}></option>
                      {branches.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                    </BootstrapForm.Select>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-5 mb-3">
              <Button
                variant="outline-primary"
                className="rounded-pill px-4 py-2"
                type="submit"
              >
                Save
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default UpdateManageTemplates;
