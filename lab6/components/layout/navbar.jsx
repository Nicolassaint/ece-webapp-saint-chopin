import * as React from "react";
import Link from "next/link";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import logovert from "../../public/tailwind_logo.png";

let Menu = [
  { Name: "Home", link: "/" },
  { Name: "About", link: "/about" },
  { Name: "Contacts", link: "/contacts" },
  { Name: "Articles", link: "/articles" },
  { Name: "Sign in", link: "/profile" },
  { Name: "Sign up", link: "/register" },
];

const drawerWidth = 240;

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        APP WEB
      </Typography>
      <Divider />
      <List>
        {Menu.map((item) => (
          <ListItem key={item.Name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.Name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Image src={logovert} alt="JEECE_logo" width="80px" height="80px" />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <nav class="px-2 sm:px-4 py-2.5 flex justify-between">
        <div class="mt-4 ml-2">
          <Link href="/">
            <Image
              src={logovert}
              alt="logo JEECE"
              width="75px"
              height="75px"
            />
          </Link>
        </div>

        <div class="flex items-center mt-4 mr-4">
          <div class="hidden md:block">
            <button
              type="button"
              class="text-white bg-greenJeece hover:bg-greenJeece rounded-full px-4 py-4 mr-3"
            >
              <SendIcon />
            </button>
          </div>

          <div class="bg-greenJeece shadow-lg rounded-full hidden md:block">
            <div className="container flex p-4  dark:text-gray-300">
              {Menu.map((l) => (
                <div key={l.Name} className="border-b-2 text-black border-transparent hover:text-blueJeece dark:hover:text-gray-200 hover:border-blueJeece mx-1.5 lg:mx-4">
                  <Link href={l.link}>{l.Name}</Link>
                </div>
              ))}
            </div>
          </div>
          <div class="md:hidden">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ mr: 2, fontSize: "50px" }} />
            </IconButton>
          </div>
        </div>
      </nav>
      <Box>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
