// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchIndividual} from 'sr/utils/api/individualApi'

interface UserData {
  id: string
  name: string
}

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (payload: any) => {
  const res = await fetchIndividual({})
  const response = await fetchIndividual({limit: res.pagination.total})

  // Initialize userMap to store { id: { firstName, lastName } }
  const userMap: {[key: string]: {firstName: string; lastName: string}} = {}
  const userData: UserData[] = [] as UserData[]

  // Single iteration to update statistics and build userMap
  response.data.forEach((user) => {
    // Update the userMap with firstName and lastName
    userMap[user.id] = {
      firstName: user.first_name,
      lastName: user.last_name,
    }
    userData.push({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
    })
  })

  return {
    userMap,
    userData,
  }
})
