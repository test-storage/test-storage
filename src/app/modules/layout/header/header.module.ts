import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from './../../../services/theme/theme.service';

import { HeaderComponent } from './header.component';

import { NotificationsComponent } from '../notifications/notifications.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        HeaderModule
    ],
    declarations: [
        HeaderComponent,
        NotificationsComponent
    ],
    providers: [
        ThemeService
    ]
})
export class HeaderModule { }
