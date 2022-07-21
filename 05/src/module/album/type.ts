import type { FilterKeysByType, DbId, SchemeId } from '../../common/type';
import type { Scheme as ArtistScheme } from '../artist/type';
import type { Scheme as BandScheme } from '../band/type';
import type { Scheme as TrackScheme } from '../track/type';
import type { Scheme as GenreScheme } from '../genre/type';

type AlbumBaseType = {
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
};

type RequiredField = 'name';
type ArrayField = FilterKeysByType<AlbumBaseType, Array<any>>;

type AlbumInputType = Required<Pick<AlbumBaseType, RequiredField>> &
  Partial<Omit<AlbumBaseType, RequiredField | 'image'>>;

type AlbumOutputType = Required<
  Pick<AlbumBaseType, RequiredField | ArrayField>
> &
  Partial<Omit<AlbumBaseType, RequiredField | ArrayField>> &
  DbId;

/**
 * from albumScheme
 */
type AlbumScheme = {
  name: string;
  released?: number;
  artists?: ArtistScheme[];
  bands?: BandScheme[];
  tracks?: TrackScheme[];
  genres?: GenreScheme[];
  image?: string;
} & SchemeId;

/**
 * from albumScheme
 */
type AlbumDto = {
  name: string;
  released?: number;
  artistsIds?: SchemeId['id'][];
  bandsIds?: SchemeId['id'][];
  tracksIds?: SchemeId['id'][];
  genresIds?: SchemeId['id'][];
  image?: string;
};

export {
  AlbumInputType as InputType,
  AlbumOutputType as OutputType,
  AlbumScheme as Scheme,
  AlbumDto as Dto,
};
