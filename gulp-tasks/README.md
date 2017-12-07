## Build Tasks through Gulp.js ##

A gulp task consists of `name`, `dependencies`, and `fn` that does the actual build job. This dir serves as a  build tasks repo in a modularized way.

### To add a new task ###

1. Create a task in `./tasks` dir. 
  - If a task is only to trigger some dependencies, you can skip this step.
  - Export the function that does the build job.

2. Specificies dependencies in `./deps.js` if there is any.

3. Register in `./index.js`. And the task will be run during `npm run build`.
