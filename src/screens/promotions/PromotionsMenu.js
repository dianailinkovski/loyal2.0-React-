import React from 'react';
import { Divider, Typography, Row, Col, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

function PromotionsMenu() {
  const navigate = useNavigate();
  const { currentPromotionsMenuSchema } = useSelector(
    state => state.currentData
  );
  return (
    <>
      <Row className="mx-4">
        <Col xs={23} sm={23} md={6} lg={6} xl={6} xxl={8}>
          <Title level={3}>Non-transactional Promotions</Title>
        </Col>
        <Col
          xs={23}
          sm={23}
          md={18}
          lg={18}
          xl={18}
          xxl={16}
          style={{ textAlign: 'end' }}
        >
          <Space>
            {Object.entries(currentPromotionsMenuSchema).map((row, index) => {
              return index >= 1 && index <= 5 ? (
                <Button
                  key={index}
                  className={
                    row[1].active ? 'btn-active-menu' : 'btn-inactive-menu'
                  }
                  onClick={() =>
                    navigate(
                      row[1].route === '/datamanager/bb_loyal2_promotions/'
                        ? '/non-transactional_promotions'
                        : row[1].route
                    )
                  }
                >
                  {row[0] == 'Add' ? (
                    <PlusOutlined style={{ marginTop: '-2px' }} />
                  ) : null}
                  {row[0]}
                </Button>
              ) : null;
            })}
          </Space>
        </Col>
      </Row>
      <Divider />
    </>
  );
}
export default PromotionsMenu;
