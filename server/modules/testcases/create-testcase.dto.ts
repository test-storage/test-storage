import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsArray, IsBoolean, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateTestcaseDto {

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

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly testSuiteId: string;

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

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly preConditions?: string;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly steps?: Array<string>;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly postConditions?: string;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly tags?: Array<string>;

  @ApiModelPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
  readonly created?: Date;

  @ApiModelPropertyOptional({ type: Date })
  @IsOptional()
  @IsDate()
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
