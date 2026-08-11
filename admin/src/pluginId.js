import pluginPkg from '../../package.json';

const pluginId = pluginPkg.name.replace(/^@punch-in\/strapi-plugin-/i, '');

export default pluginId;
