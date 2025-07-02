const { ApiWrapper } = require('./helpers/wrapper')
const { Select } = require('enquirer')
const digisimWrapper = new ApiWrapper('https://digisim.co/api/v1', 'your_api_key')

/**
 * Parse Id From Label
 */
const parseId = (data) => {
  return data.split('(')[1].split(')')[0]
}

/**
 * Extract Order Id From Order Response
 */
const extractOrderId = (data) => {
  const match = /^OK:[^:]+:(\w+)/.exec(data)
  if (match && match[1]) {
    return match[1]
  } else {
    return ''
  }
}

/**
 * Main Function
 */
async function mainCliFlow() {
  const serverList = ['Stable (1)', 'Premium (2)']
  const serverPrompt = await new Select({ name: 'serverName', message: 'Select server:', choices: serverList }).run()
  const serverId = parseId(serverPrompt)
  const countryResponse = await digisimWrapper.request('get', '/country/data', { server: serverId })
  const countryList = (countryResponse || []).map(countryItem => {
    return {
      id: countryItem.country_id,
      name: countryItem.country_name + ' (' + countryItem.country_id + ')',
      operators: countryItem.country_operator || []
    }
  })
  if (countryList.length) {
    const countryPrompt = await new Select({ name: 'countryId', message: 'Select country:', choices: countryList.map(item => item.name) }).run()
    const countryId = parseId(countryPrompt)
    const selectedCountry = countryList.find(item => item.id === countryId)
    if (selectedCountry.operators && selectedCountry.operators.length) {
      const operatorPrompt = await new Select({ name: 'operatorName', message: 'Select operator:', choices: selectedCountry.operators }).run()
      const productResponse = await digisimWrapper.request('get', '/product/data', {
        country_id: countryId,
        server: serverId
      })
      const productList = (productResponse || []).map(productItem => {
        return {
          id: productItem.product_id,
          name: productItem.product_name + ' - ' + productItem.product_price + ' (' + productItem.product_id + ')'
        }
      })
      if (productList.length) {
        const productPrompt = await new Select({ name: 'productName', message: 'Select product:', choices: productList.map(item => item.name) }).run()
        const productId = parseId(productPrompt)
        const orderResponse = await digisimWrapper.request('post', '/transaction/order', {}, {
          product_id: productId,
          product_country: countryId,
          product_operator: operatorPrompt.toLowerCase(),
          product_server: serverId
        })
        const orderId = extractOrderId(orderResponse)
        if (orderId) {
          console.log('\nOrder Created:', orderResponse)
          console.log('ID:', extractOrderId(orderResponse))
        } else {
          console.log('Order failed')
        }
      } else {
        console.log('No product found')
      }
    } else {
      console.log('No available operator for this country')
    }
  } else {
    console.log('No country found')
  }
}

mainCliFlow()