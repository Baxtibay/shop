import { defineStore } from 'pinia'
import { getMonthly, getDaily, toggleItem } from '@/api/dashboard'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    monthly: null,
    daily: null,
    items: [],
    loading: false
  }),

  actions: {

    // STATE RESET WHEN STORE CHANGED
    reset() {
      this.monthly = null
      this.daily = null
      this.items = []
    },

    // BASIC DOWNLOAD
    async loadDashboard(shopId) {

      if (!shopId) return

      this.reset()
      this.loading = true

      try {

        // Get Monthly
        const monthly = await getMonthly(shopId)

        if (!monthly || !monthly.id) {
          // Monthly yo‘q — shu yerda to‘xtaymiz
          this.monthly = null
          return
        }

        this.monthly = monthly

        // Get Daily
        const daily = await getDaily(shopId)

        if (!daily || !daily.items) {
          this.daily = null
          this.items = []
          return
        }

        this.daily = daily
        this.items = daily.items

      } catch (e) {
        console.error('Dashboard load error:', e)
        this.reset()
      } finally {
        this.loading = false
      }
    },

    // ITEM TOGGLE
    async toggle(item) {
      if (!item || !this.monthly) return

      const newValue = item.is_checked

      try {
        await toggleItem(item.id, newValue)

        const amount = Number(item.amount)

        if (newValue) {
          this.monthly.total_paid += amount
        } else {
          this.monthly.total_paid -= amount
        }

        if (this.monthly.total_paid < 0) {
          this.monthly.total_paid = 0
        }

        this.monthly.remaining =
          this.monthly.amount - this.monthly.total_paid

        this.monthly.progress =
          this.monthly.amount > 0
            ? (this.monthly.total_paid / this.monthly.amount) * 100
            : 0

      } catch (e) {
        // revert
        item.is_checked = !newValue
        console.error('Toggle error:', e)
      }
    }
  }
})