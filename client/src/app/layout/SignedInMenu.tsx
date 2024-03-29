import {Button, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import {Link} from "react-router-dom";
import {signOut} from "../../features/account/accountSlice";
import {clearBasket} from "../../features/basket/basketSlice";
import {useAppDispatch, useAppSelector} from "../store/configureStore";

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.account);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color='inherit' sx={{typography: "h6"}} onClick={handleClick}>
        {user?.name}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to='/orders'>
          My orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
