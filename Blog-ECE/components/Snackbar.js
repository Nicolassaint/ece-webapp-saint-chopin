import React from "react";
// @material-ui/icons
import Check from "@mui/icons-material/Check";
//import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from '@mui/material/SnackbarContent';
//import Clearfix from "components/Clearfix/Clearfix.js";

export default function Notifications() {
  return (
    <div>
      <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> You've got some friends nearby, stop looking
            at your phone and find them...
          </span>
        }
        close
        color="success"
        icon={Check}
      />
      {/* <Clearfix /> */}
    </div>
  );
}