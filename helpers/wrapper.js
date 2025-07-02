const axios = require('axios')

/**
 * Parse DigiSim API Response
 * Params: ApiResponse
 */
function parseResponse(apiResponse) {
  if (apiResponse) {
    const { responseCode, responseData } = apiResponse
    if (responseCode === 200) {
      return responseData
    } else {
      throw new Error(responseData)
    }
  } else {
    throw new Error('Invalid Response')
  }
}

/**
 * Constructor For DigiSim API Wrapper
 * Params: BaseUrl, ApiKey
 */
class ApiWrapper {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  /**
   * Request Handler
   * Params: Method, Path, ParamsObj, DataObj
   */
  async request(method, path, paramsObj = {}, dataObj = {}) {
    try {
      const config = {
        method: method,
        url: `${this.baseUrl}${path}`,
        params: {},
        data: {}
      }
      if (method === 'get') {
        config.params = { ...paramsObj, api_key: this.apiKey }
      } else {
        config.params = { api_key: this.apiKey }
        config.data = { ...dataObj }
      }
      const response = await axios(config)
      return parseResponse(response.data)
    } catch (error) {
      if (error.response && error.response.data) {
        return parseResponse(error.response.data)
      } else {
        throw new Error(error.message)
      }
    }
  }
}

/**
 * Exports
 */
module.exports = {
  ApiWrapper
}