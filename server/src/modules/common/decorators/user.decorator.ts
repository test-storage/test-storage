import { createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator((data, req) => {
  return req.user.userId;
});
