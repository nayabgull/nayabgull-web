import * as migration_20261105_181948_initial from './20261105_181948_initial';
import * as migration_20261110_113331_leads from './20261110_113331_leads';
import * as migration_20261116_162409_lead_type from './20261116_162409_lead_type';
import * as migration_20261119_063341_blog from './20261119_063341_blog';
import * as migration_20261121_200233_lead_services from './20261121_200233_lead_services';

export const migrations = [
  {
    up: migration_20261105_181948_initial.up,
    down: migration_20261105_181948_initial.down,
    name: '20261105_181948_initial',
  },
  {
    up: migration_20261110_113331_leads.up,
    down: migration_20261110_113331_leads.down,
    name: '20261110_113331_leads',
  },
  {
    up: migration_20261116_162409_lead_type.up,
    down: migration_20261116_162409_lead_type.down,
    name: '20261116_162409_lead_type',
  },
  {
    up: migration_20261119_063341_blog.up,
    down: migration_20261119_063341_blog.down,
    name: '20261119_063341_blog',
  },
  {
    up: migration_20261121_200233_lead_services.up,
    down: migration_20261121_200233_lead_services.down,
    name: '20261121_200233_lead_services',
  },
];
