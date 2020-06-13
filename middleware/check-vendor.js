export default async ({ $axios, store, error, redirect }) => {
  try {
    if (store.state.user.user.isVendor) {
      await store.dispatch('vendor/loadProfile', { $axios, store });
    } else {
      return redirect('/account/register/vendor');
    }
  } catch (e) {
    console.log(e);
    const { response, message } = e;
    return error({
      statusCode: response ? response.status : 503,
      message: response ? response.statusText : message
    });
  }
};
