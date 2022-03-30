const staticParkingJam = "Parking-jam-site-v1"
const assets = [
  "/",
  "index.html",
  "HTML/about.html",
  "CSS/design.css",
  "CSS/first_page.css",
  "IMAGE/image1.png",
  "IMAGE/image2.png",
  "HTML/main.html",
  "CSS/navbar.css",
  "IMAGE/obstical.png",
  "CSS/signIn.css",
  "HTML/signIn.html",
  "CSS/signIn.css",
  "HTML/signUp.html",
  "IMAGE/tumblr_inline_mw5iqkPFmO1qz62bd540.gif",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticParkingJam).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })