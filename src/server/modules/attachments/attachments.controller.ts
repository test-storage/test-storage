import { Post, Controller, Body, Param, Request, Response, HttpStatus } from '@nestjs/common';

import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

import { AttachmentsService } from './attachments.service';


@Controller('attachments')
export class AttachmentsController {

  constructor(private readonly attachmentsService: AttachmentsService) { }

  @Post('/upload')
  async testUpload( @Response() res, @Request() req, @Body('data') data) {
    console.log(req.files);
    console.log(data);
    res.status(HttpStatus.OK).json({ data: 'success' });
  }

}



