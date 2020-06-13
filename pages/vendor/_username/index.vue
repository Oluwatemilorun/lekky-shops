<template>
  <div />
</template>

<script>
export default {
  async asyncData({ $axios, params, error }) {
    try {
      // eslint-disable-next-line no-unused-vars
      let { username } = params;

      username = username.replace('-', ' ');

      // eslint-disable-next-line no-unused-vars
      const { data, status, statusText } = await $axios.get(
        `/vendor/${params.id}`
      );

      console.log(data.payload);

      return {
        ...data.payload
      };
    } catch (e) {
      const { response } = e;
      if (response)
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 500, message: e.message });
    }
  }
};
</script>

<style></style>
