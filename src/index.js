import { initMongoDB } from './db/initMongoDB.js';

const bootstrap = async () => {
  await initMongoDB();
};

bootstrap();
