import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Assuming you create a separate CSS file for styling

const Dashboard = () => { // Assuming store_id is passed as a prop or from context

  const store_id = localStorage.getItem('store_id');
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Choose an Action</h2>
      <Row xs={1} sm={2} md={3} lg={3} xl={3} className="g-4 mt-5">
        <Col className="d-flex">
          <Link to={`/receiving/${store_id}`} className="flex-fill dashboard-tile text-decoration-none">
            <Card className="flex-fill">
              <Card.Body>
                <h5 className="card-title">Receive Inventory</h5>
                <p className="card-text">Manage and receive new inventory items into the system.</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col className="d-flex">
          <Link to={`/inventory/${store_id}`} className="flex-fill dashboard-tile text-decoration-none">
            <Card className="flex-fill">
              <Card.Body>
                <h5 className="card-title">View Inventory</h5>
                <p className="card-text">View and track your current inventory levels and details.</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col className="d-flex">
          <Link to={`/adjust-inventory/${store_id}`} className="flex-fill dashboard-tile text-decoration-none">
            <Card className="flex-fill">
              <Card.Body>
                <h5 className="card-title">Adjust Inventory</h5>
                <p className="card-text">Adjust inventory quantities and update item records.</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col className="d-flex">
          <Link to={`/generate-inventory-report/${store_id}`} className="flex-fill dashboard-tile text-decoration-none">
            <Card className="flex-fill">
              <Card.Body>
                <h5 className="card-title">Generate Inventory Report</h5>
                <p className="card-text">Generate detailed reports of your inventory status.</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col className="d-flex">
          <Link to={`/conduct-inventory-count/${store_id}`} className="flex-fill dashboard-tile text-decoration-none">
            <Card className="flex-fill">
              <Card.Body>
                <h5 className="card-title">Conduct Inventory Count</h5>
                <p className="card-text">Perform inventory counts to reconcile discrepancies.</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col className="d-flex">
          <Link to={`/generate-purchase-order/${store_id}`} className="flex-fill dashboard-tile text-decoration-none">
            <Card className="flex-fill">
              <Card.Body>
                <h5 className="card-title">Generate/Create Purchase Order</h5>
                <p className="card-text">Create and generate purchase orders to replenish inventory.</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
