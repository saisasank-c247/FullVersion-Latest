// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'


// ** Icons Imports
import Icon from 'src/@core/components/icon'
import { SidebarLeftType } from 'src/types/apps/imagegeneratorTypes'


const SidebarLeft = (props: SidebarLeftType) => {
  const {
    mdAbove,
    leftSidebarOpen,
    leftSidebarWidth,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle
  } = props

//   const colorsArr = calendarsColor ? Object.entries(calendarsColor) : []



  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle()
    // dispatch(handleSelectEvent(null))
  }

    return (
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          disableAutoFocus: true,
          disableScrollLock: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          zIndex: 3,
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            borderRadius: 1,
            boxShadow: 'none',
            width: leftSidebarWidth,
            borderTopRightRadius: 0,
            alignItems: 'flex-start',
            borderBottomRightRadius: 0,
            zIndex: mdAbove ? 2 : 'drawer',
            position: mdAbove ? 'static' : 'absolute'
          },
          '& .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute'
          }
        }}
      >
        <Box sx={{ p: 6, width: '100%' }}>
          <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={handleSidebarToggleSidebar}>
            <Icon icon='tabler:plus' fontSize='1.125rem' />
            Add User
          </Button>
        </Box>

        
      </Drawer>
    )
  
}

export default SidebarLeft
