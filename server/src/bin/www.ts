import app from '../app';
import { createServer } from 'http';

import sequelize from '../models';

(async () => {
  await sequelize.track.sync();
  await sequelize.user.sync();
  await sequelize.userTrack.sync();
  await sequelize.admin.sync();
  await sequelize.project.sync();
  await sequelize.article.sync();
  await sequelize.projectArticle.sync();
  console.log('DB SYNC CLEAR.');
})();

const port: number = Number(process.env.PORT) || 4000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`port ${port} is ready...`);
});
