import { api } from './client'

export async function createMonthly(shopId, amount) {
  const res = await api.post('/nalog/v1/create-monthly', {
    shop_id: shopId,
    amount
  })
  return res.data
}

export async function getMonthly(shopId) {
  const res = await api.get(`/nalog/v1/monthly/${shopId}`)
  return res.data
}