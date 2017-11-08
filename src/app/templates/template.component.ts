import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Template } from './template';
// import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/* tinyMce */
import { TinyEditorComponent} from '../shared/tiny-editor.component';

@Component({
    selector: '[template-component]',
    templateUrl: './template.html'
})

export class TemplateComponent implements OnInit {
    @Input () template:Template;
    @Output() onTemplateContextEdit = new EventEmitter();
    showTinyMce:boolean=false;
    // templateCollection:AngularFirestoreCollection<Template>;
    templates:Observable<Template[]>;
    editedTemplate:Template;
    constructor() {
        // this.templateCollection = this.afs.collection<Template>('templates');
        // this.templates = this.templateCollection.valueChanges();
     }

    ngOnInit() { }

    keyupHandlerFunction(e):void{
      console.log(e);
      this.template.template = e; //e is the HTML output from your TinyMCE component
      }
    // onTemplateContextEdit(e):void{
        
    // }
    templateContextChanged(){
        this.onTemplateContextEdit.emit(this.template);
    }
    templateDeActivate(){
        this.template.isActive = false;
        this.onTemplateContextEdit.emit(this.template);
    }

}