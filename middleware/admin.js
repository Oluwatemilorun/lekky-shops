// eslint-disable-next-line no-unused-vars
import { getAdminToken, getUserFromLocalStorage } from '~/utils/auth';
import { SetBreadcrumbs } from '~/utils/breadcrumbs';
import axios from '~/plugins/axios';

export default async ({ isServer, store, req, error, redirect }) => {
  try {
    // store.commit("toolbar/hide"); // this is still sketchy

    // If nuxt generate, pass this middleware
    if (isServer && !req) return;
    else if (!isServer && !req) return;

    store.commit(
      'admin/setBreadcrumbs',
      SetBreadcrumbs(req.url.replace('/admin/', '/'))
    );

    if (req.url.includes('login')) return;

    const token = getAdminToken(req);

    if (token) {
      console.log('admin logged in');

      const { data } = await axios.get('/api/admin/profile', {
        withCredentials: true,
        headers: {
          'x-access-admin-token': token
        }
      });

      if (data.state === 'OK') {
        store.commit('admin/setAdmin', data.payload);
      } else {
        store.commit('admin/setAdmin', null);
        return redirect(`/admin/login?redirect=${req.originalUrl}`);
      }
    } else {
      store.commit('admin/setAdmin', null);
      return redirect(`/admin/login?redirect=${req.originalUrl}`);
    }
  } catch (e) {
    console.log(e);

    const { response, message } = e;
    if (response && response.status === 403)
      return redirect(`/admin/login?redirect=${req.originalUrl}`);
    else error({ statusCode: 500, message });
  }
};
