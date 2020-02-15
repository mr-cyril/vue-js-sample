import axios from "axios";

class HttpConsumer {
  constructor(params = undefined) {
    this._consumer = axios.create(params);
  }

  get defaults() {
    return this._consumer.defaults;
  }

  set defaults(object) {
    this._consumer.defaults = object;
  }

  async request(config = undefined) {
    const response = await this._consumer.request(config);
    return response;
  }

  async get(url, config = undefined) {
    const response = await this._consumer.get(url, config);
    return response;
  }

  async delete(url, config = undefined) {
    const response = await this._consumer.delete(url, config);
    return response;
  }

  async head(url, config = undefined) {
    const response = await this._consumer.head(url, config);
    return response;
  }

  async post(url, data = undefined, config = undefined) {
    const response = await this._consumer.post(url, data, config);
    return response;
  }

  async put(url, data = undefined, config = undefined) {
    const response = await this._consumer.put(url, data, config);
    return response;
  }

  async patch(url, data = undefined, config = undefined) {
    const response = await this._consumer.patch(url, data, config);
    return response;
  }
}

const http = new HttpConsumer({
  baseURL: process.env.BASE_URL,
  timeout: 60000,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  responseType: "json"
});

export { http as default, HttpConsumer };
