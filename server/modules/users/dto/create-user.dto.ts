import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly _id?: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  readonly photo?: string;
  readonly workInfo?: any;
  readonly social?: any;
  readonly userGroups?: Array<string>;
  readonly projects?: Array<string>;
  readonly created?: string;
  readonly updated?: string;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
