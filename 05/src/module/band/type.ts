import type { FilterKeysByType, DbId, SchemeId } from '../../common/type';
import type { Scheme as GenreScheme } from '../genre/type';

type Member = {
  artist: string;
  instrument?: string;
  years?: string[];
};

type BandBaseType = {
  name: string;
  origin: string;
  members: Member[];
  website: string;
  genresIds: string[];
};

type RequiredField = 'name';
type ArrayField = FilterKeysByType<BandBaseType, Array<any>>;

type BandInputType = Required<Pick<BandBaseType, RequiredField>> &
  Partial<Omit<BandBaseType, RequiredField>>;

type BandOutputType = Required<Pick<BandBaseType, RequiredField | ArrayField>> &
  Partial<Omit<BandBaseType, RequiredField | ArrayField>> &
  DbId;

/**
 * from bandScheme
 */
type BandScheme = {
  name: string;
  origin?: string;
  members?: Member[];
  website?: string;
  genres?: GenreScheme[];
} & SchemeId;

/**
 * from bandScheme
 */
type BandDto = {
  name: string;
  origin?: string;
  members?: Member[];
  website?: string;
  genresIds?: SchemeId['id'][];
};

export {
  BandInputType as InputType,
  BandOutputType as OutputType,
  BandScheme as Scheme,
  BandDto as Dto,
};
