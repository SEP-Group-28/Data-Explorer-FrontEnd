import * as React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Token from "../../services/Token"
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../../../public/Logo.png"


const userPages = ["Home", "Stock", "Crypto"];
const pages = [...userPages, "Login","Sign up"];
const settings = ["Profile", "Watch list", "Logout"];

const HeaderTwo = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

   const directPage=(e)=>{
    setAnchorElNav(null);
    console.log("page is",e.target.name);
   }

   function colorBackground(e) {
     e.target.style.background = "red";
   }

   function clearBackground(e){
    e.target.style.background = "none";
   }

  //  try{
  //     var user=jwtDecode(Token.getAccessToken())
  //     
  //    }
  //    catch(err){
  //      user=null
  //    }
   const user = true;

  return (
    <AppBar className="AppBar" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} href="/" />

          <Box sx={{display:"flex" ,flexDirection:"row-reverse", flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton style={{ alignItems:"center", marginRight: user? "60px" :"0px"}}
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
              {!user && pages.map((page) => (
                <MenuItem  key={page}  >
                  <Link style={{color:"white"}} to={page=="Home"? "/": page=="Sign up"? "register": "/"+page}  className="menu-names" >
                    {page}
                  </Link>
                </MenuItem>
              ))}
              {user && userPages.map((page) => (
                <MenuItem key={page}  >
                  <Link to={page=="Home"? "/": "/"+page}  className="menu-names" >
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <div className="pages">
            <Box className="page-box justify-content-between" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {!user && pages.map((page) => (
                <Link style={{backgroundColor: page=="Sign up"?"#286AEF" : "none"}}className={page=="Sign up"? "Signup-HeaderTwo page-buttons" : "page-buttons"} to={page=="Home"? "/": page=="Sign up"? "register": "/"+page} 
                  key={page}
                  name={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Link>
              ))}
              {user && userPages.map((page) => (
                <Link className={page=="Sign up"? "Signup-HeaderTwo page-buttons" : "page-buttons"} to={page=="Home"? "/": page=="Sign up"? "register": "/"+page} 
                  key={page}
                  name={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Link>
              ))}
            </Box>

             {user && <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
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
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            }
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderTwo;
