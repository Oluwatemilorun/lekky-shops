<template>
  <div />
</template>

<script>
/*
export default {
  async asyncData({ $axios, req, res, params, query, error }) {
    try {
      const { category, country } = query;
      const url =
        category && country
          ? `/api/vendor?category=${category}&country=${country}`
          : category
          ? `/api/vendor?category=${category}`
          : country
          ? `/api/vendor?category=${country}`
          : '/api/vendor';
			
      const { data, status, statusText } = await axios(url, {
        method: 'get',
        withCredentials: true
      });

      console.log(data.payload);

      return {
        vendors: data.payload
      };
    } catch (e) {
      const { response } = e;
      if (response)
        error({ statusCode: response.status, message: response.statusText });
      else error({ statusCode: 500, message: e.message });
    }
  }
}; */
</script>

<style></style>
