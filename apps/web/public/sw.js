if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + ".js", n).href),
    s[a] ||
      new Promise(s => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, t) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let c = {};
    const o = e => a(e, i),
      r = { module: { uri: i }, exports: c, require: o };
    s[i] = Promise.all(n.map(e => r[e] || o(e))).then(e => (t(...e), c));
  };
}
define(["./workbox-9564d7f6"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/_9y24MLbWY1PoFSPkB7z2/_buildManifest.js",
          revision: "0a1497b2890313a985b453cbb84907bf"
        },
        {
          url: "/_next/static/_9y24MLbWY1PoFSPkB7z2/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933"
        },
        {
          url: "/_next/static/chunks/542-4406d3ac74c46ae0.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/838-9533da8fab7a548a.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/a55dab97-ddfdb61351a7e75a.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-aadb58ee552f6df9.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/app/layout-0b1f5aa6368278f3.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/app/page-7a1b5399fe4d707a.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/framework-67030333c0d3feae.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/main-747629081dc72902.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/main-app-8ef04588d4772a6d.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/pages/_app-b8e1f94f11ae33d7.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/pages/_error-c7b31037ae670f98.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3"
        },
        {
          url: "/_next/static/chunks/webpack-a9dcb0a892afecc5.js",
          revision: "_9y24MLbWY1PoFSPkB7z2"
        },
        {
          url: "/_next/static/css/14c3196cc25bff31.css",
          revision: "14c3196cc25bff31"
        },
        {
          url: "/_next/static/media/0ecf308bb9fb1d5a-s.p.woff2",
          revision: "9c33c8480b0a6673501bc8323b95f75f"
        },
        {
          url: "/_next/static/media/39da14ecabd06836-s.p.woff2",
          revision: "bc1d3f2c49fb89b9d0811a37deb10ff9"
        },
        {
          url: "/_next/static/media/4a232156ba45a84d-s.p.woff2",
          revision: "4b235c29127500c2a712612d48d1ea98"
        },
        {
          url: "/_next/static/media/4a3a093e0c736ed4-s.p.woff2",
          revision: "76c3e97607f9798b6875ec3ffac0b7a7"
        },
        {
          url: "/_next/static/media/5c511f8b28e29201-s.p.woff2",
          revision: "eaf98d503b6a237a957dea302f14549c"
        },
        {
          url: "/_next/static/media/83bce7a3ea9e3165-s.p.woff2",
          revision: "95fe35603b152f031c8ee58c3133c33a"
        },
        {
          url: "/_next/static/media/b13a4710b46bfc64-s.p.woff2",
          revision: "e171478aa5541d37780293100811c3d2"
        },
        {
          url: "/_next/static/media/f27af9bfb9ecb402-s.p.woff2",
          revision: "2ed2b109e6f8b7b00cca576f46bb9bf3"
        },
        {
          url: "/_next/static/media/f978c10d4e606ca7-s.p.woff2",
          revision: "70b3b2382c5e2ed4707932161c6dc6ff"
        },
        {
          url: "/_next/static/media/fe98ce7aadedec5b-s.p.woff2",
          revision: "95a312063afb2845a16e50062107f588"
        }
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers
                  })
                : e
          }
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: s } }) =>
        !(!e || s.startsWith("/api/auth/callback") || !s.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        a &&
        !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        "1" === e.headers.get("RSC") && a && !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })
        ]
      }),
      "GET"
    );
});
//# sourceMappingURL=sw.js.map
