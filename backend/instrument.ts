import Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

import 'dotenv/config';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
});

Sentry.profiler.startProfiler();