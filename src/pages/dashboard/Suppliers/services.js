import axios from 'axios'

export const getSuppliers = ({ token }) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/suppliers`,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data.data
      }
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al consultar los proveedores!')
    })
}

export const createSupplierService = ({ token, data }) => {
  return axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/suppliers`, data,
    {
      headers: { authorization: `Bearer ${token}` }
    })
    .then((res) => {
      return res
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al registrar el proveedor!')
    })
}
