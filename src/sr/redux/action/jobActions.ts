// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchJobs} from 'sr/utils/api/fetchJobs'
export const fetchJobData = createAsyncThunk('job/fetchJobData', async (payload: any) => {
  const res = await fetchJobs({})
  const response = await fetchJobs({limit: res.pagination.total})
  const data: {job_title: string; id: string}[] = []
  const idNameMap: {[key: string]: string} = {}
  response.data.forEach((job) => {
    idNameMap[job.id] = job.job_title
    data.push({
      job_title: job.job_title,
      id: job.id,
    })
  })
  return {
    data,
    idNameMap,
  }
})
