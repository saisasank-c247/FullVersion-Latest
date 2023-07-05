export type SidebarRightType = {
    mdAbove: boolean
    RightSidebarWidth: number
    RightSidebarOpen: boolean
    validation?: ((s: any, t: any) => void | undefined) | undefined
    handleLeftSidebarToggle?: () => void
    handleAddEventSidebarToggle?: () => void
  }
  
  export type AddEventSidebarType = {
    drawerWidth: number
    addEventSidebarOpen: boolean
    handleAddEventSidebarToggle: () => void
  }