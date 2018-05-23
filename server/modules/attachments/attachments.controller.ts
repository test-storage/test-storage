import { Post, Controller, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';

import { AttachmentsService } from './attachments.service';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Attachments')
@Controller('api/v1/attachments')
export class AttachmentsController {

  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('filename', { dest: './uploads' }))
  testUpload(@UploadedFile() file) {
    console.log(file);
  }

}



