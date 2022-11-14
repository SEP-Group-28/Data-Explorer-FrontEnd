import React from "react";
import { Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import Typography from "@mui/material/Button";

function PWA() {
  window.onload = function () {
    let deferredPrompt;
    var div = document.getElementById("add-to");
    var button = document.getElementById("add-to-btn");
    div.style.display = "none";

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredPrompt = event;
      div.style.display = "block";
    });

    button.addEventListener("click", () => {
      div.style.display = "none";
      deferredPrompt.prompt();
      const result = deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
        } else {
        }
      });
      window.deferredPrompt = null;
    });
  };
  window.addEventListener("appinstalled", () => {
    div.style.display = "none";
    deferredPrompt = null;
  });
  return (
    <div id="add-to" className="pwa d-flex flex-column">
      <header>
        <span className="paw-span1">Download your </span>
        <span className="pwa-span2">Mobile App</span>
      </header>

        <Button className="pwa-button" id="add-to-btn">
          <GetAppIcon />
          <Typography style={{ color: "#053ffbfc" }}>Install</Typography>
        </Button>
  
    </div>
  );
}

export default PWA;
