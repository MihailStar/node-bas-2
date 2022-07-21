import type { FilterKeysByType, DbId, SchemeId } from '../../common/type';

type GenreBaseType = {
  name: string;
  description: string;
  country: string;
  year: string;
};

type RequiredField = 'name';
type ArrayField = FilterKeysByType<GenreBaseType, Array<any>>;

type GenreInputType = Required<Pick<GenreBaseType, RequiredField>> &
  Partial<Omit<GenreBaseType, RequiredField>>;

type GenreOutputType = Required<
  Pick<GenreBaseType, RequiredField | ArrayField>
> &
  Partial<Omit<GenreBaseType, RequiredField | ArrayField>> &
  DbId;

/**
 * from genreScheme
 */
type GenreScheme = {
  name: string;
  description?: string;
  country?: string;
  year?: number;
} & SchemeId;

/**
 * from genreScheme
 */
type GenreDto = {
  name: string;
  description?: string;
  country?: string;
  year?: number;
};

export {
  GenreInputType as InputType,
  GenreOutputType as OutputType,
  GenreScheme as Scheme,
  GenreDto as Dto,
};
