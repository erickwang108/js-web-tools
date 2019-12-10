export const isWindows = (opts = {}) => process.platform !== 'win32' || opts.windows === true;
