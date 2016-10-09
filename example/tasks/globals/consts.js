import argv from '../utils/argv';

export const distDir = 'dist';

export const remotePath = 'https://raw.githubusercontent.com/douban/rexxar-web/master/example/dist';

export const serveIp = argv.ip || '0.0.0.0';
export const servePort = argv.p || '8080';
export const servePath = argv.ip ? `http://${argv.ip}:${servePort}` : '';
