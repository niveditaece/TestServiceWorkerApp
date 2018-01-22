
importScripts('workbox-sw.dev.v2.1.2.js')

importScripts('workbox-routing.dev.v2.1.0.js')
importScripts('workbox-runtime-caching.dev.v2.0.3.js')
importScripts('workbox-cacheable-response.dev.v2.0.3.js')
importScripts('workbox-background-sync.dev.v2.0.3.js')


const workboxSW = new WorkboxSW({
  precacheChannelName: 'pwatter-channel'
})
workboxSW.precache([])

// Background sync

let syncQueue = new workbox.backgroundSync.QueuePlugin({
  callbacks: {
    replayDidSucceed: async(hash, res) => {
      self.registration.showNotification('PWAtter', {
        body: 'Tweet was posted',
        icon: '/assets/images/logo.png',
      })
      console.log('[SW] Tweet was posted')
    },
    replayDidFail: (hash) => {},
    requestWillEnqueue: (reqData) => {
      console.log('[SW] Request queued', reqData)
    },
    requestWillDequeue: (reqData) => {
      console.log('[SW] Request dequeued', reqData)
    },
  },
})

const postTweetRequestWrapper = new workbox.runtimeCaching.RequestWrapper({
  plugins: [
    syncQueue
  ]
})

const postTweetCacheStrategy = new workbox.runtimeCaching.NetworkOnly({
  requestWrapper: postTweetRequestWrapper
})

const postTweetRoute = new workbox.routing.RegExpRoute({
  regExp: /(http?:\/\/)?([^\/\s]+\/)book/,
  handler: postTweetCacheStrategy,
  method: 'POST'
})


// Setting up custom router

const router = new workbox.routing.Router();
router.registerRoutes({
  routes: [postTweetRoute]
});
router.addFetchListener();

router.setDefaultHandler({
  handler: ({
  	console.log('[SW] Routed th sadsadhsakd'  );
    event
  }) => {
    console.log('[SW] Routed through the default handler', event.request);
    return fetch(event.request);
  },
});

