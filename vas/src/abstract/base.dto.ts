import { IsNumber, IsString } from 'class-validator';

export class BaseListingDto {

  @IsString()
  search: string;

  @IsString()
  sort: string;

  @IsNumber()
  limit: number;

  @IsNumber()
  page: number;
}
