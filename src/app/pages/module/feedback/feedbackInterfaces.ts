import {JmmApiResponse, Status} from 'sr/utils/api/globalInterface'

export interface FeedbackDetails {
  contractor_id?: string
  workorder_id?: string
  supervisor_id?: string
  contractor_rating?: number
  contractor_feedback?: string
  external_supervisor_rating?: number
  external_supervisor_feedback?: string
  internal_supervisor_rating?: number
  internal_supervisor_feedback?: string
  status: Status
  createdAt: string
  updatedAt: string
  id: string
}
// API Response Types
export type FetchFeedbackResponse = JmmApiResponse<FeedbackDetails[]>
export type FetchSingleFeedbackResponse = JmmApiResponse<FeedbackDetails>

export interface FeedbackFilters {
  limit?: number
  page?: number
  sortBy?: string
  contractor_id?: string
  workorder_id?: string
  supervisor_id?: string
  contractor_rating?: number
  external_supervisor_rating?: number
  internal_supervisor_rating?: number

  status?: Status
}


export interface UseFeedbackQueryProps {
  pagination: {itemsPerPage: number; currentPage: number}
  filters: Record<string, any>
}
