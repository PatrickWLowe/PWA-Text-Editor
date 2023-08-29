const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.textContent = "Installed";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    const { outcome } = await window.deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("PWA setup accepted");
    } else {
      console.log("PWA setup rejected");
    }
    window.deferredPrompt = null;
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
  console.log("PWA was installed");
});
