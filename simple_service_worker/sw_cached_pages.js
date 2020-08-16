if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw_cached_pages.js")
      .then((reg) => console.log("Service Worker: Registered (Pages)"))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}

// Call Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching", e);
  // e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

self.addEventListener("message", (event) => {
  const scriptURL = event.data.url;
  const url = new URLSearchParams(scriptURL);

  const interaction = url.get("interaction");
  const client = url.get("client");
  const osname = url.get("os_name");
  const x1 = url.get("x1");
  const x2 = url.get("x2");
  const x3 = url.get("x3");
  const landingurl = url.get("landing_url");

  //Translating the pixel information to the params required by the server
  const newURL = `http://127.0.0.1:3030/pixel.gif?event=${interaction}&customer=
  ${client}&operating_system_name=${osname}&utm_source=${x1}&utm_medium=${x2}
  &utm_campaign=${x3}&campaign_url=${landingurl}`;

  userAction(newURL);
});

const userAction = async (newURL) => {
  try {
    const response = await fetch(newURL);

    console.log("result = ", await response.json());
  } catch (error) {
    console.log(error);
  }
};
