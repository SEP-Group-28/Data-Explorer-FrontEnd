import * as React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Token from "../../services/Token"
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../../assets/Logo.png";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
// import NotificationModal from '../../views/notification/NotificationModal';
import Badge from '@mui/material/Badge';
import NotificationModal from '@mui/material/Modal';
import Notifications from "../../views/notification/Notifications";
import DummyData from "../../views/notification/notificationDummyData.json"
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";

const style = {
  position: 'relative',
  top: '40%',
  left: '50%',
  width: 800,
  maxWidth: 'calc(100% - 20px)',
  transform: 'translate(-50%, -50%)',
  paddingLeft: 0,
  paddingRight:0
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#292C31",
    },
  },

  formControl: {
    width: 120,
  },
}));


const userPages = ["Home", "Stock", "Crypto"];
const pages = [...userPages, "Login","Sign up"];
const settings = ["Profile", "Watchlist", "Logout"];
const HeaderTwo = ({imagepath}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  var [count, setCount] = React.useState(0);

  const[image,setImage]=React.useState(imagepath)
  const classes = useStyles();
  // console.log('allloooo')
  // console.log('IMAGE PATH',imagepath)
  useEffect(()=>{
    // console.log('aaaaaaaweeeeeee')
    setImage(imagepath)
  },[imagepath])

  const increment = () =>{
    count = count+1
    setCount(count)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  // console.log('ssssssssss',imagepath)
  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    
  };

  const handleCloseUserMenu = () => {
    // console.log('got')
    setAnchorElUser(null);
  };

   const directPage=(e)=>{
    setAnchorElNav(null);
    // console.log("page is",e.target.name);
   }

   function colorBackground(e) {
     e.target.style.background = "red";
   }

   function clearBackground(e){
    e.target.style.background = "none";
   }

  //  try{
  //     var user=jwtDecode(Token.getAccessToken())
      
  //    }
  //    catch(err){
  //      user=null
  //    }
   const user = true;
   
  // for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  
  return (


    <AppBar className="AppBar" >
      <Container maxWidth="xl" sx={{backgroundColor:"#20232B"}}>
        <Toolbar className="appbar-toolbar" disableGutters>
          <img
            src={Logo}
            onClick={() => {
              window.location.href = "/";
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              style={{
                alignItems: "center",
                marginRight: user ? "100px" : "0px",
              }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              className={classes.menu}
            
              id="basic-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {!user &&
                pages.map((page) => (
                  <MenuItem 
                  className={classes.font}
                    sx={{fontSize:"15px"}}
                    key={page}
                  >
                    <Link
                    state={{market:page=='Crypto'?
                  'BTC': page=='Stock'?
                  'TESLA':''}}
                  
                      style={{ color: "white" }}
                      to={
                        page == "Home"
                          ? "/"
                          : page == "Sign up"
                          ? "register"
                          : "/" + page
                      }
                      className="menu-names"
                    >
                      {page}
                    </Link>
                  </MenuItem>
                ))}
              {user &&
                userPages.map((page) => (
                  <MenuItem key={page}>
                    <Link
                     state={{market:page=='Crypto'?
                     'BTC': page=='Stock'?
                     'TESLA':''}}
                      to={page == "Home" ? "/" : "/" + page}
                      className="menu-names"
                    >
                      {page}
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <div className="pages d-flex flex-row justify-content-evenly">
            <Box
              className="page-box justify-content-between"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              {!user &&
                pages.map((page) => (
                  <Link
                  state={{market:page=='Crypto'?
                  'BTC': page=='Stock'?
                  'TSLA':''}}
                    style={{
                      backgroundColor: page == "Sign up" ? "#286AEF" : "none",
                    }}
                    className={
                      page == "Sign up"
                        ? "Signup-HeaderTwo page-buttons"
                        : "page-buttons"
                    }
                    to={
                      page == "Home"
                        ? "/"
                        : page == "Sign up"
                        ? "register"
                        : "/" + page
                    }
                    key={page}
                    name={page}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Link>
                ))}
              {user &&
                userPages.map((page) => (
                  <Link
                  state={{market:page=='Crypto'?
                  'BTC': page=='Stock'?
                  'TSLA':''}}
                    className={
                      page == "Sign up"
                        ? "Signup-HeaderTwo page-buttons"
                        : "page-buttons"
                    }
                    to={
                      page == "Home"
                        ? "/"
                        : page == "Sign up"
                        ? "register"
                        : "/" + page
                    }
                    key={page}
                    name={page}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Link>
                  
                ))}
                
            </Box>
            { user &&
                <div style={{marginRight:'18px'}}>
                <Badge badgeContent={DummyData.length-count} color="primary">
                <NotificationsRoundedIcon sx={{}} onClick={handleOpen}/>  
                </Badge>
                <NotificationModal sx={{mt:-8, borderWidth:0 }}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Notifications increment={increment}/>
                  </Box>
                </NotificationModal>
                </div>
              }
            {user && (
              <Box sx={{ flexGrow: 0, marginRight:'5px' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* {console.log('kkkkk')} */}
                    <Avatar key={image} alt="Remy Sharp" src={image}/>
                  </IconButton>
                </Tooltip>
                <Menu
                className={classes.menu}
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link className="menu-names" to= {"/"+setting.toLowerCase()} 
                        key={setting}
                        name={setting}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {setting}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderTwo;
