import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
/*bootstrap*/
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

/*templates components*/
import { CampaignTemplateComponent } from './templates/campaign-template.component';
import { AddTemplateComponent } from './templates/add-template.component';
import { TemplateListComponent } from './templates/template-list.component';
import { TemplateComponent } from './templates/template.component';

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

/*header */
import { HeaderComponent } from './shared/header/header.component';

/*modal */
import { NgbdModalComponent } from './shared/modal/modal.component'; //,NgbdModalContent

/*datatable*/
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

/*pagination*/
import { PaginationComponent } from './shared/pagination/pagination.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ListListComponent } from './lists/list-list.component';
import { ListComponent } from './lists/list.component';
import { TableHeaderComponent } from './shared/table/table.header';
import { AddListComponent } from './lists/add-list.component';

/*list componenets*/



const appRoutes: Routes = [
  { path:'template', component: CampaignTemplateComponent},
  {path:'lists',component:ListListComponent}
]

@NgModule({
  declarations: [
    AppComponent,CampaignTemplateComponent,TinyEditorComponent,
    AddTemplateComponent,
    TemplateListComponent,TemplateComponent,PaginationComponent
    ,HeaderComponent,NgbdModalComponent,ListListComponent,ListComponent,
    TableHeaderComponent,AddListComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxDatatableModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[TinyEditorComponent]
})
export class AppModule { }
