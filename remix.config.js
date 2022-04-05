/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  serverBuildPath: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  serverBuildTarget: 'cloudflare-workers',
  devServerBroadcastDelay: 1000
};
