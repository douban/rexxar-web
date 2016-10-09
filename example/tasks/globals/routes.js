import fs from 'fs';
import fileExists from '../utils/fileExists';
import { distDir } from './consts';

let routesPath = `${distDir}/routes.json`;

let routes = { items: [], partial_items: [] };

if (fileExists(routesPath)) {
  routes = JSON.parse(fs.readFileSync(routesPath).toString());
}


let routesMap = new Map();

routes.items.forEach(function(item, index) {
  routesMap.set(item.uri, {
    index,
    remoteFile: item.remote_file,
    deployTime: item.deploy_time
  });
});

routes.partial_items.forEach(function(item, index) {
  routesMap.set(item.uri, {
    index,
    remoteFile: item.remote_file,
    deployTime: item.deploy_time
  });
});


export {
  routes,
  routesMap
};
