import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Template } from './template';
import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';

/* tinyMce */
import { TinyEditorComponent} from '../shared/tiny-editor.component';

@Component({
    selector: 'add-template',
    templateUrl: './add-template.html',
    styleUrls: ['style.scss','../release/material.css']
})

export class AddTemplateComponent implements OnInit {
    
    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
      ];
      columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' }
      ];

      rowsTemplates = [];
      columnsTemplates  = [
        { name: 'name' },
        { name: 'language' },
        { name: 'product' },
        { name: 'fromName' },
        { name: 'subject' },
        { name: 'template' },
      ];
    //templateArray:template[];
    showTinyMce:boolean=false;
    templateCollection:AngularFirestoreCollection<Template>;
    templates:Observable<Template[]>;
    templateToSave:Template = {id:"",isActive:true,name:"test",language:"test",product:"test",fromName:"test",subject:"test",template:"test"};
    constructor(private afs:AngularFirestore) {
        this.templateCollection = this.afs.collection<Template>('templates');
        this.templates = this.templateCollection.valueChanges();
     }

    ngOnInit() { }

    testAddToTemplates(){
        let uuid = UUID.UUID();
        this.templateToSave.id = uuid;
        this.templateCollection.add(this.templateToSave);
    }
    keyupHandlerFunction(e):void{
        this.templateToSave.template = e; //e is the HTML output from your TinyMCE component
      }

}