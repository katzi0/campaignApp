import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
/*bootstrap*/
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { TemplateTableComponent } from './templates/template.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
/* tinyMce */
import { TinyEditorComponent} from './shared/tiny-editor.component';
/*firebase*/
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/*datatable*/
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const appRoutes: Routes = [
  { path:'template', component: TemplateTableComponent}
]

@NgModule({
  declarations: [
    AppComponent,TemplateTableComponent,TinyEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
     RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxDatatableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
