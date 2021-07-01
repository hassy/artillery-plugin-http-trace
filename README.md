# artillery-plugin-http-trace

## Description

Use this plugin to output HTTP request/response information as newline-delimited JSON.

The plugin will output the following information for every HTTP response:

```js
{
    req: {
      url: req.url,         // request URL
      method: req.method,   // request method, e.g. GET or POST
      headers: req.headers, // request headers
    },

    res: {
      headers: res.headers,  // response headers, including status code
      body: res.body,        // response body
      timings: res.timings   // timings, such as time-to-first-byte
    },

    vars: userContext.vars   // variables for the current VU
  }
```

## Usage

Install the plugin, and enable it in the `config` section of you script:

```yaml
config:
  plugins:
    http-trace: {}
```

## License

MPL v2.0
