const { session } = require('electron');
const url = require('url');
const path = require('path');


module.exports = function interceptRequests() {
  session.defaultSession.webRequest.onBeforeRequest((details, next) => {
    const redirectURL = details.url === 'https://www.google.com/'
      ? `file://${url.format(path.resolve(__dirname, '../render/redirected.html'))}`
      : null;
    if (redirectURL == null) {
      return next({ cancel: false });
    }
    console.log('Redirecting to:', redirectURL);
    return next({ cancel: false, redirectURL })
  });
}
