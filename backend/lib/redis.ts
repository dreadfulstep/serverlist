import { createClient } from 'redis';

import 'dotenv/config';

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.connect().catch((err) => console.error('Redis connection error:', err));

export default redisClient;