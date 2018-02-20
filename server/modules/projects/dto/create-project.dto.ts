import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateProjectDto {

  @ApiModelProperty({ type: String })
  // @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiModelProperty({ type: Boolean })
  // @IsBoolean()
  readonly enabled?: boolean;

  @ApiModelProperty({ type: String })
  readonly created?: string;
  @ApiModelProperty({ type: String })
  readonly updated?: string;
  // manager?: string; point to user

  @ApiModelProperty({ type: String })
  // @IsString()
  readonly createdBy?: string;

  @ApiModelProperty({ type: String })
  // @IsString()
  readonly updatedBy?: string;
}
