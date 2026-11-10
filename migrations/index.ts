import * as migration_20261105_181948_initial from './20261105_181948_initial';
import * as migration_20261110_113331_leads from './20261110_113331_leads';

export const migrations = [
  {
    up: migration_20261105_181948_initial.up,
    down: migration_20261105_181948_initial.down,
    name: '20261105_181948_initial',
  },
  {
    up: migration_20261110_113331_leads.up,
    down: migration_20261110_113331_leads.down,
    name: '20261110_113331_leads'
  },
];
