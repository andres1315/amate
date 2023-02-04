import axios from 'axios'
export const getAllIncomes = async () => {
  const { token } = JSON.parse(window.localStorage.getItem('loggedUser'))
  return axios.get('http://localhost:3010/api/incomes', {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.status === 200) return res.data.data
    })
    .catch(err => {
      console.log(err)
      throw new Error('Se presento un error al consultar los ingresos!')
    })
}
