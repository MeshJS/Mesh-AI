import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { iconResolver } from './iconResolver';

export const source = loader({
  baseUrl: '/apis',
  source: docs.toFumadocsSource(),
  icon: iconResolver,
});

