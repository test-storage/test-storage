import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsISO8601, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateNotificationDto {

  @ApiModelPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly _id?: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly entity: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly action: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly senderId: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly recipientId: string;

  @ApiModelProperty({ type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  readonly isRead: boolean;

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
}

