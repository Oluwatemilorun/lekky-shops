const cookie = require('js-cookie');

export const saveItem = (item) => {
  if (!item) return;

  // eslint-disable-next-line no-unused-vars
  const allItems = cookie.get('cart_item');
};
