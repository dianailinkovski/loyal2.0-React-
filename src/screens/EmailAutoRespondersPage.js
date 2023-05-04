import React from 'react';
import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Row, Col, Tooltip } from 'antd';
import { Card, Tabs, Tab } from 'react-bootstrap';

import ControlAuto from './autoResponders/emailAutoResponders/ControlAuto';
import EmailAuto from './autoResponders/emailAutoResponders/EmailAuto';
import MobileAuto from './autoResponders/emailAutoResponders/MobileAuto';
// import { useParams } from 'react-router-dom';
import endpoint from '../utils/endpoint';
import { getErrorAlert } from 'helpers/utils';
import Loading from 'components/loading';
import handleError from 'utils/handleError';
import { setMemberMenuData } from 'redux/slices/currentDataSlice';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Title, Text, Paragraph } = Typography;

const ToolTip = {
  background: 'rgb(53, 157, 217)',
  borderRadius: '50px',
  color: 'white',
  scale: '1.5'
  // marginLeft: '39em'
};

function EmailAutoResponders() {
  const dispatch = useDispatch();
  const _isMounted = useRef(false);
  // let { routeKey } = useParams();
  const [loadingSchema, setLoadingSchema] = useState(true);
  const [layoutData, setLayoutData] = useState(null);

  const initPageModule = async () => {
    try {
      _isMounted.current && setLoadingSchema(true);
      const ep = endpoint.getDataManagerSchemaEndpoint('');
      const moduleSchemaRes = await Axios.get(ep);
      let schema = moduleSchemaRes.data;
      console.log('menuSchema:->', schema);
      let layoutSchema = schema.layout;
      console.log(schema.menu, ' schema.menu schema.menu schema.menu');
      dispatch(setMemberMenuData({ currentMemberMenuSchema: schema.menu })); // store current member menu

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

  return (
    <>
      <Card className="overflow-hidden z-index-1 card-main_layout">
        <Card.Body className="p-0">
          <Row className="my-3">
            <Col xs={23} sm={23} md={23} lg={23} xl={23} xxl={23}>
              <Row className="mx-4">
                <Title level={3}>Autoresponders</Title>
              </Row>
              <Row className="mx-4 mt-3">
                <Col span={20}>
                  <Paragraph>
                    You can enable autoresponders to be sent to your members
                    when they sign up or when they get issued vouchers.
                    Autoresponders are sent via email or mobile message.
                  </Paragraph>
                </Col>
                <Col span={4} style={{ textAlign: 'end' }}>
                  <Tooltip
                    title="Import data from CSV/Excel file"
                    placement="right"
                  >
                    <QuestionCircleOutlined style={ToolTip}>
                      ?
                    </QuestionCircleOutlined>
                  </Tooltip>
                </Col>
              </Row>
              <Row className="mx-4 mt-2">
                <Col span={20}>
                  <Text strong className="text-label">
                    Emails cost 50 for 1 credit or 0.02 credits each.
                  </Text>
                  <br />
                  <Text strong className="text-label">
                    Mobile messages cost 4 for 1 credit or 0.25 credits each.
                  </Text>
                </Col>
              </Row>

              <Row className="mx-4 mt-5">
                <Col span={24}>
                  <Tabs defaultActiveKey="control" id="points" fill>
                    <Tab
                      eventKey="control"
                      title="Control Autoresponders"
                      className="border-0 py-4"
                    >
                      <ControlAuto />
                    </Tab>
                    <Tab
                      eventKey="email"
                      title="Email Autoresponders"
                      className="border-0 py-4"
                    >
                      <EmailAuto />
                    </Tab>
                    <Tab
                      eventKey="mobile"
                      title="SMS/Mobile Autoresponders"
                      className="border-0 py-4"
                    >
                      <MobileAuto />
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
export default EmailAutoResponders;
