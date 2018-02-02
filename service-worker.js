
importScripts('workbox-sw.dev.v2.1.2.js')

importScripts('workbox-routing.dev.v2.1.0.js')
importScripts('workbox-runtime-caching.dev.v2.0.3.js')
importScripts('workbox-cacheable-response.dev.v2.0.3.js')
importScripts('workbox-background-sync.dev.v2.0.3.js')


const workboxSW = new WorkboxSW();
workboxSW.precache([])

// Background sync

let syncQueue = new workbox.backgroundSync.QueuePlugin({
  callbacks: {
    replayDidSucceed: async(hash, res) => {
      self.registration.showNotification('MEANSW', {
        body: 'Book Created',
        icon: '/assets/images/logo.png',
      })
      console.log('[SW] Book was created')
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

const postBookRequestWrapper = new workbox.runtimeCaching.RequestWrapper({
  plugins: [
    syncQueue
  ]
})

const postBookCacheStrategy = new workbox.runtimeCaching.NetworkOnly({
  requestWrapper: postBookRequestWrapper
})

const postBookRoute = new workbox.routing.RegExpRoute({
  regExp: /(http[s]?:\/\/)?([^\/\s]+\/)(http[s]?:\/\/)?([^\/\s]+\/)book/,
  handler: postBookCacheStrategy,
  method: 'POST'
})


// Setting up custom router

const router = new workbox.routing.Router();
console.log('[SW] Register router');
router.registerRoutes({
  routes: [postBookRoute]
});
router.addFetchListener();

router.setDefaultHandler({
  handler: ({
  	
    event
  }) => {
    console.log('[SW] Routed through the default handler', event.request);
    return fetch(event.request);
  },
});

