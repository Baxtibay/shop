import { defineStore } from 'pinia'
import * as shopApi from '@/api/shops'

export const useShopStore = defineStore('shop', {
  state: () => ({
    shops: [],
    activeShop: null,
    loading: false
  }),

  actions: {

    async fetchShops() {
      try {
        this.loading = true
        this.shops = await shopApi.getShops()
      } finally {
        this.loading = false
      }
    },

    async createShop(name) {
      try {
        this.loading = true
        const newShop = await shopApi.createShop(name)
        this.shops.push(newShop)
        return newShop
      } finally {
        this.loading = false
      }
    },

    async renameShop(id, name) {
      await shopApi.updateShop(id, name)

      const shop = this.shops.find(s => s.id === id)
      if (shop) {
        shop.title.rendered = name
      }
    },

    async removeShop(id) {
      await shopApi.deleteShop(id)
      this.shops = this.shops.filter(s => s.id !== id)
    }

  }
})