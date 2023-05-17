import React from 'react';
import { Typography, Row, Col, Input, message } from 'antd';
import { Button } from 'react-bootstrap';
import Form1 from 'react-bootstrap/Form';
import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import endpoint from '../../utils/endpoint';
import { getErrorAlert } from 'helpers/utils';
import Loading from 'components/loading';
import handleError from 'utils/handleError';
import { setTransactionMenuData } from 'redux/slices/currentDataSlice';

const { Title, Text } = Typography;

const inputStyle = {
  borderRadius: '10px'
};
function AddScanReason() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const _isMounted = useRef(false);
  // let { routeKey } = useParams();
  const [loadingSchema, setLoadingSchema] = useState(true);
  const [layoutData, setLayoutData] = useState(null);
  const [owner, setOwner] = useState('');
  const [name, setName] = useState('');
  //   const [branchISbb_loyal2_branchesID, setBranchISbb_loyal2_branchesID] =useState('');
  const handleChange = e => {
    console.log(e.target.value);
    // setBranchISbb_loyal2_branchesID(e.target.value);
  };
  const handleChange2 = e => {
    console.log(e.target.value);
    // setBranchISbb_loyal2_branchesID(e.target.value);
  };
  const initPageModule = async () => {
    try {
      // default part
      _isMounted.current && setLoadingSchema(true);
      const ep = endpoint.getDataQuickScanReasonSchemaEndpoint('add');
      const moduleSchemaRes = await Axios.get(ep);
      let schema = moduleSchemaRes.data;
      console.log('menuSchema:->', schema);
      let layoutSchema = schema.layout;
      dispatch(
        setTransactionMenuData({ currentTransactionMenuSchema: schema.menu })
      ); // store current member menu
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

  // Loading part
  if (loadingSchema) {
    return <Loading style={{ marginTop: 150 }} msg="Loading Schema..." />;
  }
  if (!layoutData) return getErrorAlert({ onRetry: initPageModule });
  let layoutFields = layoutData.options.fields;

  const onFinish = async values => {
    console.log('Success:', values);
    try {
      _isMounted.current && setLoadingSchema(true);
      const addMember = await Axios.post(
        endpoint.appUsers('/module/bb_loyal2_quickscan_reasons'),
        {
          // ownerISbb_usersID: owner,
          ownerISbb_usersID: 4,
          name
        }
      );
      const user = addMember.data;
      // if (user.error) return message.error(user.error);
      message.success('Added successful!');
      setOwner('');
      setName('');
      console.log(`${endpoint.appUsers} response -> `, user);
    } catch (error) {
      handleError(error, true);
    } finally {
      _isMounted.current && setLoadingSchema(false);
    }
  };

  return (
    <>
      <Row className="mx-4 mt-4">
        <Col>
          <Title level={4}>Add a new QuickScan reason</Title>
        </Col>
      </Row>

      <Row className="mx-4 mt-3">
        <Col span={24}>
          {/* {layoutFields.ownerISbb_usersID ? (
            <Row>
              <Col span={20}>
                <Text className="text-label" strong>
                  Owner
                </Text>
                <Input
                  style={inputStyle}
                  placeholder={layoutFields.ownerISbb_usersID}
                  className="mt-1"
                  value={owner}
                  onChange={e => setOwner(e.target.value)}
                  required
                />
              </Col>
            </Row>
          ) : null} */}
          {layoutFields.name ? (
            <Row className="mt-3">
              <Col span={20}>
                <Text className="text-label" strong>
                  Name
                </Text>
                <Input
                  style={inputStyle}
                  placeholder={layoutFields.name}
                  className="mt-1"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </Col>
            </Row>
          ) : null}
          <Row className="mt-3">
            <Col span={20}>
              <Text className="text-label" strong>
                Autoresponder 1
              </Text>
              <Form1.Select
                defaultValue="select"
                placeholder="Select"
                style={{ width: '100%', borderRadius: '10px' }}
                onChange={e => handleChange(e)}
              >
                <option value="0">Test</option>
                <option value="1">Account Update Email</option>
                <option value="2">Account Update Text/SMS</option>
                <option value="2">Birthday Email</option>
                <option value="0">Birthday Text/SMS</option>
                <option value="1">Member Password Reset Link</option>
                <option value="2">New Member Welcome Email</option>
                <option value="2">New Member Welcome Text/SMS</option>
                <option value="0">Order Processed Email</option>
                <option value="1">Refer A Friend Email</option>
                <option value="2">Sales Upload Approved</option>
                <option value="2">Sales Upload Declined</option>
                <option value="0">Sample PDF Template</option>
                <option value="1">Subscription Added</option>
                <option value="2">Subscription Expired</option>
                <option value="2">Subscription Expiring</option>
                <option value="0">Voucher Expiry Warning</option>
                <option value="1">Voucher Issued Email</option>
                <option value="2">Voucher Issued Text/SMS</option>
                <option value="2">Voucher Request Confirmation</option>
                <option value="2">Wish List/Registry Invite Email</option>
              </Form1.Select>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col span={20}>
              <Text className="text-label" strong>
                Autoresponder 2
              </Text>
              <Form1.Select
                defaultValue="select"
                placeholder="Select"
                style={{ width: '100%', borderRadius: '10px' }}
                onChange={e => handleChange2(e)}
              >
                <option value="0">Test</option>
                <option value="1">Account Update Email</option>
                <option value="2">Account Update Text/SMS</option>
                <option value="2">Birthday Email</option>
                <option value="0">Birthday Text/SMS</option>
                <option value="1">Member Password Reset Link</option>
                <option value="2">New Member Welcome Email</option>
                <option value="2">New Member Welcome Text/SMS</option>
                <option value="0">Order Processed Email</option>
                <option value="1">Refer A Friend Email</option>
                <option value="2">Sales Upload Approved</option>
                <option value="2">Sales Upload Declined</option>
                <option value="0">Sample PDF Template</option>
                <option value="1">Subscription Added</option>
                <option value="2">Subscription Expired</option>
                <option value="2">Subscription Expiring</option>
                <option value="0">Voucher Expiry Warning</option>
                <option value="1">Voucher Issued Email</option>
                <option value="2">Voucher Issued Text/SMS</option>
                <option value="2">Voucher Request Confirmation</option>
                <option value="2">Wish List/Registry Invite Email</option>
              </Form1.Select>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Button
                variant="outline-primary"
                className="rounded-pill py-2 px-4"
                onClick={() => onFinish()}
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
export default AddScanReason;
