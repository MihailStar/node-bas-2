import type { FilterKeysByType, DbId, SchemeId } from '../../common/type';
import type { Scheme as AlbumScheme } from '../album/type';
import type { Scheme as ArtistScheme } from '../artist/type';
import type { Scheme as BandScheme } from '../band/type';
import type { Scheme as GenreScheme } from '../genre/type';

type TrackBaseType = {
  title: string;
  albumId: string;
  artistsIds: string[];
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
};

type RequiredField = 'title';
type ArrayField = FilterKeysByType<TrackBaseType, Array<any>>;

type TrackInputType = Required<Pick<TrackBaseType, RequiredField>> &
  Partial<Omit<TrackBaseType, RequiredField>>;

type TrackOutputType = Required<
  Pick<TrackBaseType, RequiredField | ArrayField>
> &
  Partial<Omit<TrackBaseType, RequiredField | ArrayField>> &
  DbId;

/**
 * from trackScheme
 */
type TrackScheme = {
  title: string;
  album?: AlbumScheme;
  artists?: ArtistScheme[];
  bands?: BandScheme[];
  duration?: number;
  released?: number;
  genres?: GenreScheme[];
} & SchemeId;

/**
 * from trackScheme
 */
type TrackDto = {
  title: string;
  albumId?: SchemeId['id'];
  artistsIds?: SchemeId['id'][];
  bandsIds?: SchemeId['id'][];
  duration?: number;
  released?: number;
  genresIds?: SchemeId['id'][];
};

export {
  TrackInputType as InputType,
  TrackOutputType as OutputType,
  TrackScheme as Scheme,
  TrackDto as Dto,
};
