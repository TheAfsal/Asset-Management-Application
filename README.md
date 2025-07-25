# Asset Management Application

## Overview
The Asset Management Application is a web-based system for managing assets, including asset categories, subcategories, branches, vendors, manufacturers, and Goods Received Notes (GRNs). It provides a clean architecture backend built with Express.js and TypeScript, using Sequelize for MySQL database interactions, and a React-based frontend with TypeScript, Tailwind CSS, and Headless UI for a responsive user interface. The application supports full CRUD operations for all entities, Excel import/export for asset categories, and GRN reporting.

### Features
- **Master Data Management**:
  - CRUD operations for Asset Categories, Asset Subcategories, Branches, Vendors, and Manufacturers.
  - Create and update operations use popovers for a user-friendly experience.
  - Delete operations include confirmation prompts.
- **GRN Management**:
  - Create, update, delete, and list GRNs with auto-generated GRN numbers.
  - GRN form with dropdowns for vendors, branches, and subcategories.
- **Excel Import/Export**:
  - Import and export asset categories via Excel files.
- **Reports**:
  - GRN Register Report with export functionality.
  - Mock Asset Summary Report (frontend-only).
- **Tech Stack**:
  - **Backend**: Express.js, TypeScript, Sequelize, MySQL.
  - **Frontend**: React, TypeScript, Tailwind CSS, Headless UI, Vite.
  - **API**: RESTful endpoints under `/api/v1`.

## Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn
- Git

## Setup Instructions

### Backend Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd asset-management
   ```

2. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment**:
   - Create a `.env` file in the `backend` directory:
     ```env
     DATABASE_URL=mysql://<username>:<password>@localhost:3306/asset_management
     PORT=3000
     ```
   - Replace `<username>` and `<password>` with your MySQL credentials.

4. **Set Up MySQL Database**:
   - Create the database:
     ```sql
     CREATE DATABASE asset_management;
     ```
   - Run migrations to create tables (assuming Sequelize migrations are set up):
     ```bash
     npx sequelize-cli db:migrate
     ```

5. **Seed Database** (Optional):
   - Insert dummy data as provided in the SQL `INSERT` statements (see [Dummy Data](#dummy-data)).
   - Example for `asset_categories`:
     ```sql
     INSERT INTO asset_categories (id, name, description, status, created_at, updated_at) VALUES
     (1, 'Electronics', 'Electronic devices and gadgets', 'active', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
     (2, 'Furniture', 'Office and home furniture', 'active', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
     (3, 'Stationery', 'Office supplies', 'inactive', '2025-07-01 10:00:00', '2025-07-01 10:00:00');
     ```

6. **Start the Backend**:
   ```bash
   npm run start
   ```
   - The server runs on `http://localhost:3000`.

### Frontend Setup
1. **Navigate to Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Vite Proxy**:
   - Ensure `vite.config.ts` includes the proxy to the backend:
     ```typescript
     export default defineConfig({
       server: {
         proxy: {
           '/api': 'http://localhost:3000',
         },
       },
     });
     ```

4. **Start the Frontend**:
   ```bash
   npm run dev
   ```
   - The frontend runs on `http://localhost:5173`.

### Dummy Data
To test the application, populate the database with the following dummy data (run in MySQL client in this order to respect foreign key constraints):

1. **Asset Categories**:
   ```sql
   INSERT INTO asset_categories (id, name, description, status, created_at, updated_at) VALUES
   (1, 'Electronics', 'Electronic devices and gadgets', 'active', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (2, 'Furniture', 'Office and home furniture', 'active', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (3, 'Stationery', 'Office supplies', 'inactive', '2025-07-01 10:00:00', '2025-07-01 10:00:00');
   ```

2. **Asset Subcategories**:
   ```sql
   INSERT INTO asset_subcategories (id, category_id, name, description, status, created_at, updated_at) VALUES
   (1, 1, 'Laptops', 'Portable computing devices', 'active', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (2, 1, 'Smartphones', 'Mobile communication devices', 'active', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (3, 2, 'Chairs', 'Seating furniture', 'active', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (4, 2, 'Tables', 'Work and dining tables', 'inactive', '2025-07-01 10:00:00', '2025-07-01 10:00:00');
   ```

3. **Branches**:
   ```sql
   INSERT INTO branches (id, name, location, code, status, created_at, updated_at) VALUES
   (1, 'Main Branch', 'Mumbai', 'MB001', 'active', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (2, 'Branch A', 'Delhi', 'BA002', 'active', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (3, 'Branch B', 'Bangalore', 'BB003', 'inactive', '2025-07-01 10:00:00', '2025-07-01 10:00:00');
   ```

4. **Vendors**:
   ```sql
   INSERT INTO vendors (id, name, contact_person, email, phone, address, gst_number, created_at, updated_at) VALUES
   (1, 'Tech Solutions', 'Amit Sharma', 'amit@techsolutions.com', '9876543210', '123 Tech Street, Mumbai', 'GSTIN123456789', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (2, 'Furniture World', 'Priya Singh', 'priya@furnitureworld.com', '9123456789', '456 Furniture Road, Delhi', 'GSTIN987654321', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (3, 'Office Supplies Ltd', 'Rahul Verma', 'rahul@officesupplies.com', '9001234567', '789 Supply Lane, Bangalore', 'GSTIN456789123', '2025-07-01 10:00:00', '2025-07-01 10:00:00');
   ```

5. **Manufacturers**:
   ```sql
   INSERT INTO manufacturers (id, name, description, created_at, updated_at) VALUES
   (1, 'TechCorp', 'Leading electronics manufacturer', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (2, 'FurniTech', 'High-quality furniture manufacturer', '2025-07-01 10:00:00', '2025-07-01 10:00:00'),
   (3, 'SupplyPro', 'Stationery and office supplies', '2025-07-01 10:00:00', '2025-07-01 10:00:00');
   ```

6. **GRN Headers**:
   ```sql
   INSERT INTO grn_headers (id, grn_number, grn_date, invoice_number, vendor_id, branch_id, status, created_at, updated_at) VALUES
   (1, 'GRN-202507-101', '2025-07-10', 'INV-001', 1, 1, 'submitted', '2025-07-10 10:00:00', '2025-07-10 10:00:00'),
   (2, 'GRN-202507-102', '2025-07-11', 'INV-002', 2, 2, 'draft', '2025-07-11 10:00:00', '2025-07-11 10:00:00'),
   (3, 'GRN-202507-103', '2025-07-12', 'INV-003', 3, 1, 'submitted', '2025-07-12 10:00:00', '2025-07-12 10:00:00');
   ```

7. **GRN Line Items**:
   ```sql
   INSERT INTO grn_line_items (id, grn_id, subcategory_id, item_description, quantity, unit_price, tax_percent, taxable_value, total_amount, created_at, updated_at) VALUES
   (1, 1, 1, 'Dell XPS 13 Laptop', 5, 1000.00, 18, 5000.00, 5900.00, '2025-07-10 10:00:00', '2025-07-10 10:00:00'),
   (2, 1, 2, 'Samsung Galaxy S23', 10, 800.00, 18, 8000.00, 9440.00, '2025-07-10 10:00:00', '2025-07-10 10:00:00'),
   (3, 2, 3, 'Ergonomic Chair', 3, 200.00, 12, 600.00, 672.00, '2025-07-11 10:00:00', '2025-07-11 10:00:00'),
   (4, 3, 1, 'HP Pavilion Laptop', 2, 1200.00, 18, 2400.00, 2832.00, '2025-07-12 10:00:00', '2025-07-12 10:00:00');
   ```

## API Endpoints
The backend provides RESTful APIs under `/api/v1`. Below are the key endpoints:

### Asset Categories (`/api/v1/asset-categories`)
- **GET**: List all asset categories (`200 OK`).
- **POST**: Create a new asset category (`201 Created`).
- **PUT /:id**: Update an asset category (`200 OK`).
- **DELETE /:id**: Delete an asset category (`204 No Content`).

### Asset Subcategories (`/api/v1/asset-subcategories`)
- **GET**: List all asset subcategories (`200 OK`).
- **POST**: Create a new asset subcategory (`201 Created`).
- **PUT /:id**: Update an asset subcategory (`200 OK`).
- **DELETE /:id**: Delete an asset subcategory (`204 No Content`).

### Branches (`/api/v1/branches`)
- **GET**: List all branches (`200 OK`).
- **POST**: Create a new branch (`201 Created`).
- **PUT /:id**: Update a branch (`200 OK`).
- **DELETE /:id**: Delete a branch (`204 No Content`).

### Vendors (`/api/v1/vendors`)
- **GET**: List all vendors (`200 OK`).
- **POST**: Create a new vendor (`201 Created`).
- **PUT /:id**: Update a vendor (`200 OK`).
- **DELETE /:id**: Delete a vendor (`204 No Content`).

### Manufacturers (`/api/v1/manufacturers`)
- **GET**: List all manufacturers (`200 OK`).
- **POST**: Create a new manufacturer (`201 Created`).
- **PUT /:id**: Update a manufacturer (`200 OK`).
- **DELETE /:id**: Delete a manufacturer (`204 No Content`).

### GRNs (`/api/v1/grns`)
- **GET**: List all GRNs (`200 OK`).
- **GET /:id**: Get a specific GRN (`200 OK`).
- **POST**: Create a new GRN (`201 Created`).
- **PUT /:id**: Update a GRN (`200 OK`).
- **DELETE /:id**: Delete a GRN (`204 No Content`).

## Frontend Routes
The frontend is accessible at `http://localhost:5173` and includes the following routes:
- `/asset-categories`: List, create, update, delete asset categories; includes Excel import/export.
- `/asset-subcategories`: List, create, update, delete asset subcategories.
- `/branches`: List, create, update, delete branches.
- `/vendors`: List, create, update, delete vendors.
- `/manufacturers`: List, create, update, delete manufacturers.
- `/grns`: List GRNs.
- `/grns/new`: Create a new GRN.
- `/reports/grn-register`: GRN Register Report with export.
- `/reports/asset-summary`: Mock Asset Summary Report.

## Testing Instructions
1. **Start Servers**:
   - Backend: `cd backend && npm run start`
   - Frontend: `cd frontend && npm run dev`

2. **Test Master Data**:
   - Navigate to `http://localhost:5173/asset-categories`.
   - Use the “Create Asset Category” button to open a popover, enter details (e.g., name: “Computers”, description: “Computing devices”, status: “active”), and save.
   - Edit a category by clicking “Edit” in the table row, update fields, and save.
   - Delete a category by clicking “Delete” and confirming the prompt.
   - Repeat for `/asset-subcategories`, `/branches`, `/vendors`, and `/manufacturers`.

3. **Test Excel Import/Export**:
   - On `/asset-categories`, click “Export” to download an `.xlsx` file.
   - Modify the file and upload it using the file input to import new categories.
   - Verify the table and database (`SELECT * FROM asset_categories;`).

4. **Test GRN**:
   - Go to `http://localhost:5173/grns/new`, fill in the form (select vendor, branch, subcategory), and save.
   - Verify the GRN appears at `http://localhost:5173/grns`.
   - Edit or delete a GRN as needed.

5. **Test Reports**:
   - Visit `http://localhost:5173/reports/grn-register` to view the GRN report and export it.
   - Check `http://localhost:5173/reports/asset-summary` for the mock report.

6. **API Testing** (using Postman or curl):
   - **Create**: `POST http://localhost:3000/api/v1/asset-categories` with body:
     ```json
     {"name": "Electronics", "description": "Electronic devices", "status": "active"}
     ```
   - **Update**: `PUT http://localhost:3000/api/v1/asset-categories/1` with body:
     ```json
     {"name": "Updated Electronics", "description": "Updated devices", "status": "inactive"}
     ```
   - **Delete**: `DELETE http://localhost:3000/api/v1/asset-categories/1`
   - Repeat for other endpoints.

## Notes
- **Foreign Key Constraints**: Ensure dummy data is inserted in the correct order (categories, subcategories, branches, vendors, manufacturers, GRNs, line items) to avoid foreign key errors. Configure `ON DELETE CASCADE` or `RESTRICT` as needed (e.g., for `asset_subcategories.category_id`).
- **Error Handling**: Frontend displays errors in popovers for create/update failures. Backend returns `400` for invalid inputs and `500` for server errors.
- **Auto-Generated GRN Numbers**: Handled in the frontend (`GRNForm.tsx`). Ensure the format (e.g., `GRN-YYYYMM-XXX`) is consistent.
- **Dependencies**:
  - Backend: `express`, `sequelize`, `mysql2`, `typescript`.
  - Frontend: `react`, `typescript`, `tailwindcss`, `@headlessui/react`, `axios`, `vite`.
- **Future Improvements**:
  - Add toast notifications for better UX.
  - Implement pagination for large datasets.
  - Add authentication for secure API access.

## Troubleshooting
- **Database Errors**: Verify MySQL is running and `.env` is configured correctly.
- **API 404s**: Ensure the Vite proxy is set up and the backend is running.
- **Foreign Key Issues**: Check table relationships and insert dummy data in the correct order.