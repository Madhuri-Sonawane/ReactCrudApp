import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar({ onFormClick, onListClick }) {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management App
        </Typography>

        <Button
          color="inherit"
          onClick={onFormClick}
          sx={{
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)"
            }
          }}
        >
          Add User
        </Button>

        <Button
          color="inherit"
          onClick={onListClick}
          sx={{
            ml: 1,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)"
            }
          }}
        >
          User List
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
