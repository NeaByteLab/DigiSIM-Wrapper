# DigiSIM API Wrapper

Minimalistic Node.js wrapper for the DigiSIM API - designed for seamless SIM management, order automation, and instant integration. 

---

## 🚀 Features

* Supports all DigiSIM main endpoints (account, product, etc)
* Universal, easy-to-use request handler with unified response format
* Full error handling and response parsing

---

## 🛠️ Installation

1. **Clone this repo**
   ```sh
   git clone https://github.com/NeaByteLab/DigiSIM-Wrapper
   cd DigiSIM-Wrapper
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Example Script**

   - Check [`example.js`](./example.js) for full usage flow and endpoint demonstration.

---

## ⚡ Quick Start

1. Get your API key from [DigiSIM user profile](https://digisim.co/panel/user-profile)
2. Copy `ApiWrapper` to your project
3. Use the code example above to connect and send any command
4. Build your CLI, dashboard, or integration easily

---

## 📝 Notes

* All requests use async/await and return a unified response object.
* Fill `your_product_id`, `your_country_id`, `operator_name`, and `your_order_id` with values from previous API calls.
* See full endpoint docs and request/response details: [DigiSIM API Postman Docs](https://www.postman.com/neabytelab/digisim-api-doc/overview)
* For API support contact DigiSIM via the website.

---

## 📌 License

MIT © [NeaByteLab](https://github.com/NeaByteLab)