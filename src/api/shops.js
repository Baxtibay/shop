import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

/* ===============================
   GET SHOPS (wp/v2)
================================ */

export async function getShops() {
  const res = await axios.get(`${API}/wp/v2/shop`)
  return res.data
}

/* ===============================
   CREATE SHOP
================================ */

export async function createShop(name) {
  const res = await axios.post(`${API}/nalog/v1/create-shop`, {
    name
  })
  return res.data
}

/* ===============================
   UPDATE SHOP
================================ */

export async function updateShop(id, name) {
  const res = await axios.post(`${API}/nalog/v1/update-shop`, {
    id,
    name
  })
  return res.data
}

/* ===============================
   DELETE SHOP
================================ */

export async function deleteShop(id) {
  const res = await axios.delete(`${API}/nalog/v1/delete-shop/${id}`)
  return res.data
}

/* ===============================
   UPDATE MONTHLY
================================ */

export async function updateMonthly(monthlyId, amount) {
  const res = await axios.post(`${API}/nalog/v1/update-monthly`, {
    monthly_id: monthlyId,
    amount
  })
  return res.data
}