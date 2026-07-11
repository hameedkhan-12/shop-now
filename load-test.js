import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 150 },   // ramp up to 20 users over 30s
    { duration: "1m",  target: 400 },   // hold 20 users for 1 minute
    { duration: "30s", target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],  // 95% of requests must be under 500ms
    http_req_failed:   ["rate<0.01"],  // less than 1% failure rate
  },
};

const BASE_URL = "http://localhost:4000/api";

export default function () {
  // Simulate a user browsing the store

  // 1. Hit product listing (read → replica or primary via HAProxy)
  const listRes = http.get(`${BASE_URL}/products?page=1`);
  check(listRes, {
    "products list status 200": (r) => r.status === 200,
    "products list has data":   (r) => JSON.parse(r.body).data.data.length > 0,
  });

  // sleep(1);

  // 2. Hit a single product (read)
  const products = JSON.parse(listRes.body).data.data;
  if (products.length > 0) {
    const id = products[0].id;
    const detailRes = http.get(`${BASE_URL}/products/${id}`);
    check(detailRes, {
      "product detail status 200": (r) => r.status === 200,
    });
  }

  // sleep(1);
}

// export default function adminLoad() {
//   const payload = JSON.stringify({
//     name: `Product ${Math.random()}`,
//     description: "Load test product",
//     price: 29.99,
//     stock: 100,
//     category: "Electronics",
//   });

//   const createRes = http.post(`${BASE_URL}/products`, payload, {
//     headers: {
//       "Content-Type": "application/json",
//       "x-admin-key": "your-secret-admin-key",  // matches your ADMIN_KEY
//     },
//   });

//   check(createRes, {
//     "create product status 201": (r) => r.status === 201,
//   });

//   // sleep(2);
// }