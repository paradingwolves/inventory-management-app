import React from 'react';

const ViewInventoryFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories
}) => {
  return (
    <div className="mb-4 d-flex flex-wrap gap-3 align-items-end">
      <div>
        <label className="form-label">Search</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search SKU or Barcode"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="form-label">Sort By</label>
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date_modified">Date Modified</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>
    </div>
  );
};

export default ViewInventoryFilter;
