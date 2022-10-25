import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
/*
export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
     <AppBar position="static" sx={{ backgroundColor: "#3fad5d" }}>
        <Toolbar>
          <IconButton
          classename="p-10 w-10 text-inherit mr-2"
            /*size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lab4 Web
          </Typography>
          <Link href="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/about">
            <Button color="inherit">About</Button>
          </Link>
          <Link href="/contacts">
            <Button color="inherit">Contacts</Button>
          </Link>
          <Link href="/articles">
            <Button color="inherit">Articles</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}*/

export default function Navbar() {
  return (
    <div class="bg-gray-700">
      <div class="mx-auto max-w-xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="hidden sm:ml-50 sm:block">
              <div class="flex space-x-10">
                <a
                  href="/"
                  class="hover:bg-gray-700 text-gray-300 hover:text-white  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>

                <a
                  href="/about"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>

                <a
                  href="/contacts"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contacts
                </a>

                <a
                  href="/articles"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Articles
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
