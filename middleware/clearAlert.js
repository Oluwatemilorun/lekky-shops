// used to clear alerts created in vendor bar
// pages [/account/vendor/service/_id]

export default async ({ store }) => {
  await store.commit('alerts/clearAll');
};
