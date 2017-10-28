import * as crypto from 'crypto';
import { writeFileSync } from 'fs';

const fileName = '../server/routes/config/secret.ts';

const key = crypto.randomBytes(256).toString('hex');

const data = `function secret() {
    return '${key}';
}
export { secret };
`;

writeFileSync(fileName, data);
