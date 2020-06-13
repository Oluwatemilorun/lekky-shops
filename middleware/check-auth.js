export default async ({ $axios, store, req, error }) => {
  try {
    if (process.server && !req) return;

    if (process.client) {
      // console.log(window)
    } else if (process.server) {
      if (req.url.includes('/admin')) return;

      await store.dispatch('user/checkAuth', { req, $axios });
    } else return;
  } catch (e) {
    console.log(e);
    const { response, message } = e;
    if (
      (response && response.status === 401) ||
      (response && response.status === 403)
    )
      return {};
    else
      error({
        statusCode: response ? response.status : 503,
        message: response ? response.statusText : message
      });
  }
};
