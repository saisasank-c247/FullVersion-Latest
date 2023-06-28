// ** Types
import { Dispatch } from 'redux'

// ** Theme Type Import
import { ThemeColor } from 'src/@core/layouts/types'


export type EventDateType = Date | null | undefined

export type CalendarColors = {
  ETC: ThemeColor
  Family: ThemeColor
  Holiday: ThemeColor
  Personal: ThemeColor
  Business: ThemeColor
}


export type EventStateType = {
    url: string
    enterText: string
    numberImages: any
    size: any
}


export type CalendarType = {
  handleLeftSidebarToggle: () => void
  handleAddEventSidebarToggle: () => void
  events:any
}

export type SidebarLeftType = {
  mdAbove: boolean
  leftSidebarWidth: number
  leftSidebarOpen: boolean
  handleLeftSidebarToggle: () => void
  handleAddEventSidebarToggle: () => void
//   handleSelectEvent: (event: null | EventType) => void
}

export type AddEventSidebarType = {
  drawerWidth: number
  addEventSidebarOpen: boolean
  handleAddEventSidebarToggle: () => void
  dataGet:(e:any)=>void
  addUser?:any
//   handleSelectEvent: (event: null | EventType) => void
}

export type EditEventSidebarType = {
  drawerWidth: number
  editEventSidebarOpen: boolean
  handleEditEventSidebarToggle: () => void
  dataGet:(e:any)=>void
  editUser?:any
  editValue?:any
//   handleSelectEvent: (event: null | EventType) => void
}
