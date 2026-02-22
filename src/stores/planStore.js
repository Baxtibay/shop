import { defineStore } from 'pinia'
import * as monthlyApi from '@/api/monthlyPlans'
import * as dailyApi from '@/api/dailyPlans'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    monthlyPlan: null,
    dailyItems: []
  }),

  actions: {
    async createMonthly(shopId, amount) {
      this.monthlyPlan = await monthlyApi.createMonthly(shopId, amount)
      this.dailyItems = await dailyApi.generateDaily(shopId)
    },

    async fetchDaily(shopId) {
      this.dailyItems = await dailyApi.getDaily(shopId)
    }
  }
})
