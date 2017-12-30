import { IsString, IsInt, IsNotEmpty, IsArray, IsBoolean, IsNumber } from 'class-validator';

export class CreateTestcaseDto {

  @IsString()
  readonly _id?: string;

  @IsString()
  readonly key?: string;

  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @IsString()
  @IsNotEmpty()
  readonly testSuiteId: string;

  @IsNumber()
  readonly priority?: number;

  @IsNumber()
  readonly order?: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description?: string;

  @IsString()
  readonly preConditions?: string;

  @IsArray()
  readonly steps?: Array<string>;

  @IsArray()
  readonly testData?: Array<string>;

  @IsArray()
  readonly expected?: Array<string>;

  @IsString()
  readonly postConditions?: string;

  @IsArray()
  readonly tags?: Array<string>;

  readonly created?: string;
  readonly updated?: string;

  @IsString()
  readonly createdBy?: string;

  @IsString()
  readonly updatedBy?: string;

  @IsBoolean()
  readonly isAutomated?: boolean;

  @IsString()
  readonly estimate?: string;

  @IsString()
  readonly status?: string;
}
