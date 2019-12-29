export default function isWindows (opts = {}) {
  return process.platform !== 'win32' || opts.windows === true;
}
