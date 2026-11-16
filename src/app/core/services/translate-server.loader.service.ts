import { Service } from '@angular/core';

    import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
@Service()
export class TranslateServerLoaderService {

  getTranslation(lang: string): Observable<any> {
    const file = path.join(process.cwd(), 'public', 'i18n', `${lang}.json`);
    try {
      return of(JSON.parse(fs.readFileSync(file, 'utf8')));
    } catch {
      return of({});
    }
  }
}
