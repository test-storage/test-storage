import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTestsuiteDto {

  @ApiModelPropertyOptional({ type: String})
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly parentId: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @ApiModelPropertyOptional({ type: String})
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiModelPropertyOptional({ type: String})
  @IsOptional()
  @IsString()
  readonly created?: string;
  @ApiModelPropertyOptional({ type: String})
  @IsOptional()
  @IsString()
  readonly updated?: string;

  @ApiModelPropertyOptional({ type: String})
  @IsOptional()
  @IsString()
  readonly createdBy?: string;

  @ApiModelPropertyOptional({ type: String})
  @IsOptional()
  @IsString()
  readonly updatedBy?: string;
}
