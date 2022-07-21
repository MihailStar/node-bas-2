import type { FilterKeysByType, DbId, SchemeId } from '../../common/type';
import type { Scheme as BandScheme } from '../band/type';

type ArtistBaseType = {
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: string[];
  instruments: string[];
};

type RequiredField = 'firstName' | 'secondName' | 'country';
type ArrayField = FilterKeysByType<ArtistBaseType, Array<any>>;

type ArtistInputType = Required<Pick<ArtistBaseType, RequiredField>> &
  Partial<Omit<ArtistBaseType, RequiredField>>;

type ArtistOutputType = Required<
  Pick<ArtistBaseType, RequiredField | ArrayField>
> &
  Partial<Omit<ArtistBaseType, RequiredField | ArrayField>> &
  DbId;

/**
 * from artistScheme
 */
type ArtistScheme = {
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  bands?: BandScheme[];
  instruments?: string[];
} & SchemeId;

/**
 * from artistScheme
 */
type ArtistDto = {
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  bandsIds?: SchemeId['id'][];
  instruments?: string[];
};

export {
  ArtistInputType as InputType,
  ArtistOutputType as OutputType,
  ArtistScheme as Scheme,
  ArtistDto as Dto,
};
