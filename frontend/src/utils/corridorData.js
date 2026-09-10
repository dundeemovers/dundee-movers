/**
 * Master Corridor & Regional Route Data Index for Dundee Movers.
 * Combines modular local areas and UK intercity routes.
 * Strictly complies with AGENTS.md SRP & 500-line limits.
 */

import { LOCAL_AREAS } from './corridors/localAreas.js';
import { UK_ROUTES } from './corridors/routes.js';

export { LOCAL_AREAS, UK_ROUTES };

export const CORRIDOR_DATA = [
  ...LOCAL_AREAS,
  ...UK_ROUTES
];
