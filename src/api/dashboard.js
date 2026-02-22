import { api } from './client'

export async function getMonthly(shopId) {
  const res = await api.get(`/nalog/v1/monthly/${shopId}`)
  return res.data
}

export async function getDaily(shopId) {
  const res = await api.get(`/nalog/v1/daily/${shopId}`)
  return res.data
}

export async function toggleItem(itemId, checked) {
  const res = await api.post('/nalog/v1/toggle-item', {
    item_id: itemId,
    checked
  })
  return res.data
}