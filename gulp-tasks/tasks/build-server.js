const taskName = __filename.slice(__dirname.length + 1, -3);
const taskCfg = require('../defaults/task-defaults')[taskName];
const buildBabel = require('./shared/build-babel');

module.exports = () => buildBabel(taskCfg.src, taskCfg.dest);
