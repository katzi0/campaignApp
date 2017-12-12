import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';

/* tinyMce */
import { TinyEditorComponent} from '../tiny-editor.component';
import { Template } from '../../templates/template';

@Component({
    selector: 'add-item',
    templateUrl: './add-item.html',
    styleUrls: ['style.scss','../release/material.css']
})

export class AddItemComponent implements OnInit {
    @Input() itemCatagory:string;
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

    addToTemplates(){
        let uuid = UUID.UUID();
        this.templateToSave.id = uuid;
        this.templateCollection.add(this.templateToSave);
    }
    keyupHandlerFunction(e):void{
        this.templateToSave.template = e; //e is the HTML output from your TinyMCE component
      }

}