import React, { useState } from 'react';
import useReceiveInventoryItem from '../../hooks/inventory/useAddInventory';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';

const ReceiveInventory = ({ storeId, username }) => {
  const [barcode, setBarcode] = useState('');
  const [submittedBarcode, setSubmittedBarcode] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const { receiveItemByBarcode, loading } = useReceiveInventoryItem();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    setSubmittedBarcode(barcode);

    const result = await receiveItemByBarcode({
      storeId,
      barcode,
      username,
    });

    if (result.success) {
      setMessage(`Inventory updated for barcode ${barcode}`);
    } else {
      setError(result.message || 'An error occurred while processing the barcode.');
    }

    setBarcode('');
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1 className="mb-4">Receive Inventory</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="barcode" className="form-label">Scan Barcode</label>
            <input
              type="text"
              className="form-control"
              id="barcode"
              placeholder="Scan with Zebra scanner..."
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              autoFocus
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {message && (
          <div className="alert alert-success mt-4" role="alert">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ReceiveInventory;
