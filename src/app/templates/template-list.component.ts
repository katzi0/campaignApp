import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Template } from './template';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/* tinyMce */
import { TinyEditorComponent} from '../shared/tiny-editor.component';

@Component({
    selector: 'template-list',
    templateUrl: './template-list.html'
})

export class TemplateListComponent implements OnInit {
    selectedTemplate:Template;
    rawClicked:boolean = false;
    columnsTemplates  = [
        { name: 'fromName' },
        { name: 'language' },
        { name: 'name' },
        { name: 'product' },
        { name: 'subject' },
        { name: 'template' },
        { name: 'tinyMce' }
      ];


    showTinyMce:boolean=false;
    templateCollection:AngularFirestoreCollection<Template>;
    templates:Observable<Template[]>;
    templatesArr:Array<Template>;
    editedTemplate:Template;

    templateToSaveDoc:AngularFirestoreDocument<Template>;
    templateToSave:Observable<Template>;

    constructor(private afs:AngularFirestore) {
        this.templateCollection = this.afs.collection<Template>('templates');
        this.templates = this.templateCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data() as Template;
              const uid = a.payload.doc.id;
              return { uid, ...data };
            });
        });
      //  this.templates.subscribe(x => {this.templatesArr = x,console.log(this.templatesArr)});
     }

    ngOnInit() { }


    //   testRowClick(event):void{
    //     //   this.selectedTemplate = 
    //       this.rawClicked = true;
    //    console.log(event.cellElement);
    // }
    onTemplateContextEdit(e:Template){
        this.templateToSaveDoc = this.afs.doc<Template>('/templates/'+e.uid);
        this.templateToSaveDoc.update(e);
        // this.templateToSave = this.templateToSaveDoc.valueChanges();
        console.log(e);

    }
}
