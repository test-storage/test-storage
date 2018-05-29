import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsNotEmpty, IsDate, IsBoolean, IsArray } from 'class-validator';

export class CreateTestResultDto {

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly testrunId: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly testcaseId: string;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly builds?: Array<string>;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly platforms?: Array<string>;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly status?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly notes?: string;

  @ApiModelPropertyOptional({ type: Array })
  @IsOptional()
  @IsArray()
  readonly attachments?: Array<string>;

  @ApiModelPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  readonly created?: Date;

  @ApiModelPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  readonly updated?: Date;

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly createdBy?: string;

  @ApiModelPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly updatedBy?: string;
}
