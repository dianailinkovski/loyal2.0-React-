import React from 'react';
import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import endpoint from '../../utils/endpoint';
import { getErrorAlert } from 'helpers/utils';
import Loading from 'components/loading';
import handleError from 'utils/handleError';
import { setPointMenuData } from 'redux/slices/currentDataSlice';

import { Form } from 'react-bootstrap';

import {
  Typography,
  Row,
  Col,
  Input,
  InputNumber,
  DatePicker,
  message
} from 'antd';
const { Title, Text } = Typography;
function SettingsAdd() {
  const dispatch = useDispatch();
  const _isMounted = useRef(false);
  const [loadingSchema, setLoadingSchema] = useState(true);
  const [layoutData, setLayoutData] = useState(null);
  // const ownerISbb_usersID="";
  // const _id="";
  // const internal_notesISsmallplaintextbox="";
  const [memberISbb_usersID, setMemberISbb_usersID] = useState('');
  const [code, setCode] = useState('');
  const [transaction_date, setTransaction_date] = useState('');
  const [pointsNUM, setPointsNUM] = useState('');
  const [branchISbb_loyal2_branchesID, setBranchISbb_loyal2_branchesID] =
    useState('');
  const datechange = (a, b) => {
    console.log(a, 'aaa');
    console.log(b, 'bbb');
    setTransaction_date(b);
  };
  const handleChange = e => {
    console.log(e.target.value);
    setBranchISbb_loyal2_branchesID(e.target.value);
  };
  const pointChange = e => {
    console.log(e, 'pointnum');
    setPointsNUM(e);
  };
  const initPageModule = async () => {
    try {
      _isMounted.current && setLoadingSchema(true);
      const ep = endpoint.getPointDataManagerSchemaEndpoint('add');
      const moduleSchemaRes = await Axios.get(ep);
      let schema = moduleSchemaRes.data;
      console.log('menuSchema:->', schema);
      let layoutSchema = schema.layout;
      console.log(schema.menu, ' schema.menu schema.menu schema.menu');
      dispatch(setPointMenuData({ currentPointMenuSchema: schema.menu })); // store current point menu
      _isMounted.current && setLayoutData(layoutSchema);
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
  const Add = async () => {
    try {
      _isMounted.current && setLoadingSchema(true);

      console.log(endpoint.appUsers(layoutData.options.post_endpoint));
      console.log(memberISbb_usersID, 'memberISbb_usersID');
      console.log(code, 'code');
      console.log(transaction_date, 'transaction_date');
      console.log(pointsNUM, 'pointsNUM');
      console.log(branchISbb_loyal2_branchesID, 'branchISbb_loyal2_branchesID');
      console.log(endpoint.appUsers(layoutData.options.post_endpoint));

      const addMember = await Axios.post(
        endpoint.appUsers('/module/bb_loyal2_points'),
        {
          memberISbb_usersID,
          code,
          transaction_date,
          pointsNUM,
          branchISbb_loyal2_branchesID
          // ownerISbb_usersID:145,
          // internal_notesISsmallplaintextbox:11
        }
      );
      const user = addMember.data;
      if (user.error) return message.error(user.error);
      message.success('Added successful!');
      console.log(`${endpoint.appUsers} response -> `, user);
    } catch (error) {
      handleError(error, true);
    } finally {
      _isMounted.current && setLoadingSchema(false);
      setMemberISbb_usersID('');
      setCode('');
      setPointsNUM('');
    }
  };
  return (
    <>
      <Row className="mx-4 mt-3">
        <Col>
          <Title strong className="mb-3" level={4}>
            Add a new points record
          </Title>
        </Col>
      </Row>
      <Row className="mx-4 mt-3">
        <Col span={20}>
          <Text strong className="text-label">
            Member*
          </Text>
          <Input
            style={{ borderRadius: '10px' }}
            type="text"
            className="mt-1"
            value={memberISbb_usersID}
            onChange={e => setMemberISbb_usersID(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-4 mx-4">
        <Col span={20}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong className="text-label">
                Points*
              </Text>
              <InputNumber
                style={{ width: '100%', borderRadius: '10px' }}
                value={pointsNUM}
                className="mt-1"
                onChange={pointChange}
              />
            </Col>
            <Col span={12}>
              <Text strong className="text-label">
                Code
              </Text>
              <Input
                type="text"
                style={{ borderRadius: '10px' }}
                value={code}
                className="mt-1"
                onChange={e => setCode(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className=" mx-4">
        <Col span={20}>
          <Row
            className="mt-5"
            gutter={[16, 16]}
            justify="center"
            align="middle"
          >
            <Col span={9}>
              <Row align="middle">
                <Col span={12}>
                  <Text strong className="text-label">
                    Transaction Date
                  </Text>
                </Col>
                <Col span={12}>
                  <DatePicker
                    onChange={datechange}
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{
                      width: '100%',
                      borderRadius: '10px',
                      color: '#444444'
                    }}
                  />
                </Col>
              </Row>
            </Col>

            <Col span={9}>
              <Row align="middle">
                <Col span={12} style={{ textAlign: 'center' }}>
                  {' '}
                  <Text strong className="me-2 my-1 text-label">
                    Branch
                  </Text>
                </Col>
                <Col span={12}>
                  <Form.Select
                    style={{ width: '100%', borderRadius: '10px' }}
                    onChange={e => handleChange(e)}
                  >
                    <option value=""></option>
                    <option value="1">Branch1</option>
                    <option value="2">Branch2</option>
                    <option value="3">Branch3</option>
                  </Form.Select>
                </Col>
              </Row>
            </Col>
            <Col span={6} style={{ textAlign: 'end' }}>
              <Button
                variant="outline-primary"
                className="rounded-pill py-2 px-4"
                onClick={() => Add()}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default SettingsAdd;
