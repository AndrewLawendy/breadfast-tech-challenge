# EverMart: E-Commerce Product Listing Application

EverMart is a simple e-commerce application built using **React**, **Next.js (15+)**, and **TypeScript**. The app fetches product data from the **DummyJSON API** and implements a shopping cart with persistent state. It is responsive and uses modern React and Next.js features.

---

## Features

- **Product Listing**: Displays products with images, names, prices, and descriptions.
- **Shopping Cart**:
  - Add and remove items.
  - Persistent state across page reloads.
  - Displays total items and total price.
- **Responsive Design**: Works seamlessly across desktops, tablets, and mobile devices.
- **Error Handling**: Gracefully handles failed API calls and displays user-friendly messages.
- **Simulated Error Handling**: A 30% chance of simulated errors is introduced to showcase error handling, even if no actual errors occur.

---

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:AndrewLawendy/breadfast-tech-challenge.git
cd breadfast-tech-challenge
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Add Environment Variables

Create a .env.local file in the root directory and include the following:

```plaintext
KV_REST_API_URL=<your-kv-url>
KV_REST_API_TOKEN=<your-kv-token>
```

Replace `<your-kv-url>` and `<your-kv-token>` with your Vercel KV or alternative key-value store credentials.

### 4. Run the Application

```bash
yarn dev
```

The app will be available at http://localhost:3000.

## Usage

### Adding Products to Cart

- Navigate to the product listing page.
- Click the "Add to Cart" button on any product.

### Viewing the Cart

- Click the cart icon in the header to view the shopping cart.
- See the total number of items, total price, and individual product details for each item in the cart.
- For each product:
  - Use the **"+" (increment)** button to increase the quantity of a product.
  - Use the **"-" (decrement)** button to decrease the quantity of a product. If the quantity reaches zero, the product will be removed from the cart.

### Removing Products from Cart

- In the cart view, products can be removed by either:
  - Decreasing their quantity to zero using the "-" button.
  - Clicking the **"x" (remove)** button next to the product.

---

## Development Notes

### Assumptions

1. **DummyJSON API**:

   - Assumes that the API is available and operational.
   - Product data, including price and title, remains stable.

2. **Cart Persistence**:

   - The cart state is persisted using both `localStorage` (for immediate updates) and a server-side KV store (for consistency).
   - A background request is made each time the user navigates to the cart page to ensure the stored data is up-to-date. This handles scenarios where the item owner might have updated details like the title, price, or thumbnail.

3. **Responsiveness**:

   - The design supports modern devices with varying screen sizes, but assumes no specific browser features beyond ES6.

4. **Error Handling**:
   - Minimal UI for handling API errors (e.g., displaying error messages to users).
   - A simulated error mechanism is introduced, with a 30% chance of triggering an error to demonstrate error handling capabilities.

### Structure

- **Next.js App Directory**:
  - Fully utilizes the `app` directory introduced in Next.js 15+ for server and client components.
  - Leverages server actions and modern rendering patterns to ensure optimized performance.
- **TypeScript**:
  - Fully typed for robust type safety.

### Limitations

- No authentication: All cart operations are not user-specific but anonymous.
