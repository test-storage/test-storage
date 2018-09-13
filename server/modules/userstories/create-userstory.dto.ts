import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsBoolean, IsNumber, IsOptional, IsISO8601 } from 'class-validator';

export class CreateUserStoryDto {

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly key?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly priority?: string;

  @ApiModelPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  readonly order?: number;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly actor: string;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly testCases?: Array<string>;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly tags?: Array<string>;

  @ApiModelPropertyOptional({ type: Date })
  @IsOptional()
  @IsISO8601()
  readonly created?: Date;

  @ApiModelPropertyOptional({ type: Date })
  @IsOptional()
  @IsISO8601()
  readonly updated?: Date;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly createdBy?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly updatedBy?: string;

  @ApiModelPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  readonly isAutomated?: boolean;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly estimate?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly status?: string;
}
