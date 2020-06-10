import axios from '~/plugins/axios.js';

// eslint-disable-next-line require-await
export default async ({ req, isServer }) => {
  if (process.server) {
    // axios.defaults.headers.common['cookie'] = req.headers.cookie;
    axios.defaults.headers.common = {};
    Object.keys(req.headers).map((key) => {
      axios.defaults.headers.common[key] = req.headers[key];
    });
  }
};
