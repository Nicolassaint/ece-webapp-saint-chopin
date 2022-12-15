import * as React from "react";
import Link from "next/link";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import {useTheme} from "next-themes";
import{SunIcon ,MoonIcon} from "@heroicons/react/solid";


let Menu = [
  { Name: "Home", link: "/" },
  { Name: "About", link: "/about" },
  { Name: "Contacts", link: "/contacts" },
  { Name: "Articles", link: "/articles" },
  { Name: "Write", link: "/write" },
  { Name: "Account", link: "/your_account" },
];

const drawerWidth = 240;

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const [username, setUsername] = useState("invité");
  const [loading, setLoading] = useState(true);


  const {systemTheme , theme, setTheme} = useTheme ();

      const renderThemeChanger= () => {

          const currentTheme = theme === "system" ? systemTheme : theme ;

          if(currentTheme ==="dark"){
            return (
              <SunIcon className="w-10 h-10 items-center justify-center mt-9 text-yellow-500 " role="button" onClick={() => setTheme('light')} />
            )
          }

          else {
            return (
              <MoonIcon className="w-10 h-10 items-center justify-center mt-9 text-gray-900 " role="button" onClick={() => setTheme('dark')} />
            )
          }
        }

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      setUsername("invité");
    } finally {
      setLoading(false);
    }
  }

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
              <Link href={item.link}>
                <ListItemText primary={(username==='invité' && item.Name==="Write") ? "" : item.Name} />
              </Link>
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
      <nav className="px-2 sm:px-4 py-2.5 flex justify-between">
        <div className="mt-4 ml-2">
          <Link href="/">
            <Image src={logovert} alt="logo JEECE" width="75px" height="75px" />
          </Link>
        </div>
        {renderThemeChanger()}
        <div className="flex items-center mt-4 mr-4">
          <div className="bg-greenJeece shadow-lg rounded-full mr-3">
            <div className=" flex p-4 dark:text-gray-300">
              <div className="  ">
                <AccountCircleIcon />{" "}
                <span className="text-black">{username}</span>
              </div>
            </div>
          </div>

          <div className="bg-greenJeece shadow-lg rounded-full hidden md:block">
            <div className="container flex p-4  dark:text-gray-300">
              {Menu.map((l) => (
                <div
                  key={l.Name}
                  className="border-b-2 text-black transition-all duration-150 border-transparent hover:text-blueJeece dark:hover:text-gray-200 hover:border-blueJeece mx-1.5 lg:mx-4"
                >
                  <Link href={l.link}>{(username==='invité' && l.Name==="Write") ? "" : l.Name}</Link>
                </div>
              ))}
            </div>
          </div>
          <div className="md:hidden">
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
