import 'dotenv/config';
import { processEmbeddingQueue } from '../src/search/semanticSearch.js';
import { logger } from '../src/utils/logger.js';

logger.info('Embedding queue processor started');

const result = await processEmbeddingQueue(20);

logger.info('Embedding queue processed', result);
process.exit(0);
