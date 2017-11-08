import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Template } from './template';
import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AddTemplateComponent } from './add-template.component';
import { TemplateListComponent } from './template-list.component';

/* tinyMce */
import { TinyEditorComponent} from '../shared/tiny-editor.component';

@Component({
    selector: 'campaign-template-component',
    templateUrl: './campaign-template.html'
})

export class CampaignTemplateComponent implements OnInit {
    // showTinyMce:boolean=false;
    // templateCollection:AngularFirestoreCollection<Template>;
    // templates:Observable<Template[]>;
    isAddTemplate = false;
    isTemplateList = false;
    constructor(private afs:AngularFirestore) {
        // this.templateCollection = this.afs.collection<Template>('templates');
        // this.templates = this.templateCollection.valueChanges();
     }

    ngOnInit() { }

    keyupHandlerFunction(e):void{
      console.log(e); //e is the HTML output from your TinyMCE component
      }
}