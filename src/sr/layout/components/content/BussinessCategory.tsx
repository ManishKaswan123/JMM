import axios from 'axios'
import {useEffect, useState} from 'react'

const BussinessCategory = () => {
  const [bussiness, setBussinessData] = useState([])

  const apiUrl = 'https://api.86deadstock.com/v1/categories'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl) // Use Axios for GET request
        setBussinessData(response.data.results) // Update state with fetched data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {<p>Loading categories...</p>}
      {bussiness.length > 0 && (
        <ul>
          {bussiness.map((obj: any) => (
            <li key={obj?.id || obj?.name}>
              {obj?.name}
              {obj?.imagePath && (
                <img src={obj?.imagePath} alt={obj?.name} /> // Display image if available
              )}
            </li>
          ))}
        </ul>
      )}
      {bussiness.length === 0 && <p>No business categories found.</p>}
    </div>
  )
}

export default BussinessCategory
