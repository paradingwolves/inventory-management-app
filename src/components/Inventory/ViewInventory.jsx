import React, { useState, useMemo } from 'react';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import useGetInventory from '../../hooks/inventory/useGetInventory';
import { useParams } from 'react-router-dom';
import ViewInventoryFilter from './ViewInventoryFilter';

const ViewInventory = () => {
  const { store_id } = useParams();
  const { inventory, loading, error } = useGetInventory(store_id);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date_modified');

  const categories = useMemo(() => {
    const unique = new Set(inventory.map(item => item.category));
    return Array.from(unique);
  }, [inventory]);

  const filteredInventory = useMemo(() => {
    let result = [...inventory];

    if (searchTerm) {
      result = result.filter(item =>
        item.sku_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.barcode_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === 'quantity') {
        return b.quantity - a.quantity;
      } else {
        const dateA = a.date_modified?.toDate?.() || new Date(0);
        const dateB = b.date_modified?.toDate?.() || new Date(0);
        return dateB - dateA;
      }
    });

    return result;
  }, [inventory, searchTerm, selectedCategory, sortBy]);

  return (
    <div>
      <Header />
      <div className="container my-5">
        <h2 className="mb-4">Inventory for Store: {store_id}</h2>

        <ViewInventoryFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />

        {loading && <p>Loading inventory...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!loading && filteredInventory.length === 0 && <p>No inventory found.</p>}

        {!loading && filteredInventory.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SKU Number</th>
                <th>Barcode Number</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.sku_number}</td>
                  <td>{item.barcode_number}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                  <td>{item.date_modified?.toDate?.().toLocaleString?.() || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewInventory;
