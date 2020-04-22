import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import {NzBreadCrumbModule, NzLayoutModule} from 'ng-zorro-antd';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { PostsComponent } from './shared/components/posts/posts.component';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    HttpClientModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: ru_RU }],
  bootstrap: [AppComponent]
})
export class AppModule { }
