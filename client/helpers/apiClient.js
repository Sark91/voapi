import superagent from 'superagent';

// @see https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/helpers/ApiClient.js
// eslint-disable
export default class ApiClient {
  constructor(req) {
    // eslint-disable-next-line no-return-assign
    ['get', 'post'].forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](`/api/v1${path}`);

        request.set('authorization', 'abc');

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        // eslint-disable-next-line no-confusing-arrow
        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  // eslint-disable-next-line class-methods-use-this
  empty() {}
}
// eslint-enable