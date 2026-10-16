/*!
 * Copyright (C) State of Michigan. All rights reserved.
 */

import { useEffect } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css'

function App() {
}

export default App


export const API = () => {
  useEffect(() => {
    // ...
  }, [])

  return (
    <ApiReferenceReact
      configuration={{
        url: `http://localhost:8000/api/openapi.json`,
        theme: 'kepler',
        darkMode: false,
        defaultHttpClient: {
          targetKey: 'js',
          clientKey: 'fetch',
        },
        hiddenClients: {
          c: ['libcurl'],
          clojure: ['clj_http'],
          csharp: ['httpclient', 'restsharp'],
          dart: ['http'],
          fsharp: ['httpclient'],
          go: ['native'],
          http: ['http1.1'],
          java: ['asynchttp', 'nethttp', 'okhttp', 'unirest'],
          // js: ['axios', 'fetch', 'jquery', 'ofetch', 'xhr'],
          kotlin: ['okhttp'],
          node: ['axios', 'fetch', 'ofetch', 'undici'],
          objc: ['nsurlsession'],
          ocaml: ['cohttp'],
          php: ['curl', 'guzzle', 'laravel'],
          powershell: ['restmethod', 'webrequest'],
          python: ['aiohttp', 'httpx_async', 'httpx_sync', 'python3', 'requests'],
          r: ['httr2'],
          ruby: ['native'],
          rust: ['reqwest'],
          shell: ['curl', 'httpie', 'wget'],
          swift: ['nsurlsession'],
        }
      }}
    />
  )
}