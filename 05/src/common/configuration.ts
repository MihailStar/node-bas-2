import 'dotenv/config';
import { cleanEnv, str, host, port } from 'envalid';

// also use `envsafe` package
const configuration = cleanEnv(process.env, {
  NODE_ENV: str({
    default: 'development',
    choices: ['development', 'production'],
  }),

  ALBUM_URL: host(),
  ARTIST_URL: host(),
  BAND_URL: host(),
  FAVOURITE_URL: host(),
  GENRE_URL: host(),
  TRACK_URL: host(),
  USER_URL: host(),

  SERVER_PORT: port(),
});

export { configuration };
