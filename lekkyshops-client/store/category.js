import categories from '@/data/categories.json'

export const state = () => ({
  categories,
})

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
}
