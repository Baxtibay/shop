import { api } from './client'

export async function generateDaily(shopId) {
  const res = await api.post('/nalog/v1/generate-daily', {
    shop_id: shopId
  })
  return res.data
}

export async function getDaily(shopId) {
  const res = await api.get(`/nalog/v1/daily/${shopId}`)
  return res.data
}