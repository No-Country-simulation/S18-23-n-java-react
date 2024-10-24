import { MenuItem, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  onClick: () => void;
  icon: JSX.Element;
  text: string;
}

function NavLinkItem({ to, onClick, icon, text }: Props) {
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <MenuItem>
        <ListItemIcon>{icon}</ListItemIcon>
        {text}
      </MenuItem>
    </Link>
  );
}

export default NavLinkItem;
