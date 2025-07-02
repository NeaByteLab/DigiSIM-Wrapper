/**
 * DigiSim API Complete Usage Example
 * API Docs: https://www.postman.com/neabytelab/digisim-api-doc/overview
 * All responses follow: { responseTime, responseCode, responseData }
 */
const { ApiWrapper } = require('./helpers/wrapper')
const digisim = new ApiWrapper('https://digisim.co/api/v1', 'your_api_key')

/**
 * Run Full Example Flow With Clear Output And All Main Endpoints
 */
async function runExample() {
  // 1. Get account profile and balance
  const accountInfo = await digisim.request('get', '/user/data')
  console.log('=== Account Info ===\n', accountInfo)

  // 2. Get country list for filtering products (server: 1=Stable, 2=Premium, 3=Multi)
  const countryList = await digisim.request('get', '/country/data', { server: 1 })
  console.log('\n=== Country List ===\n', countryList)

  // 3. Get product list (fill country_id for filtering)
  const productList = await digisim.request('get', '/product/data', {
    country_id: '',   // Use valid country_id if needed
    keyword: '',      // Optional search
    server: 1
  })
  console.log('\n=== Product List ===\n', productList)

  // 4. Get order history (transactions)
  const orderHistory = await digisim.request('get', '/transaction/data', {
    server: '',   // Optional
    status: '',   // Optional
    page: 1
  })
  console.log('\n=== Order History ===\n', orderHistory.responseData || orderHistory.data)

  // 5. Create new single SIM order
  const createOrder1 = await digisim.request('post', '/transaction/order', {}, {
    product_id: 'your_product_id',           // Replace with actual ID from /product/data
    product_country: 'your_country_id',      // Replace with actual ID from /country/data
    product_operator: 'operator_name',       // Replace with actual operator name
    product_server: '1'                      // '1' or '2'
  })
  // Response format: STATUS:NUMBER:ID
  console.log('\n=== Create Order (Single) ===\n', createOrder1)

  // 6. Create new multiple SIM orders (batch/multi)
  const createOrder2 = await digisim.request('post', '/transaction/multi', {}, {
    product_id: JSON.stringify(['your_product_id', 'your_product_id']),
    product_country: 'your_country_id',
    product_operator: 'operator_name',
    product_server: '3'                      // Must be '3' for multi
  })
  // Response format: STATUS:NUMBER:ID1:ID2
  console.log('\n=== Create Order (Multi) ===\n', createOrder2)

  // 7. Check order status by order ID
  const checkOrder = await digisim.request('get', '/transaction/check', {
    id: 'your_order_id'                      // Replace with actual order ID
  })
  console.log('\n=== Check Order Status ===\n', checkOrder)

  // 8. Request new OTP for an existing order
  const resendOrder = await digisim.request('post', '/transaction/resend', {}, {
    id: 'your_order_id'                      // Replace with actual order ID
  })
  console.log('\n=== Resend OTP ===\n', resendOrder)
}

runExample()