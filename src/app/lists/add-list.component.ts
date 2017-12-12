import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { List } from './list';
import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';

/* tinyMce */
import { TinyEditorComponent} from '../shared/tiny-editor.component';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'add-list',
    templateUrl: './add-list.component.html',
    // styleUrls: ['style.scss','../release/material.css']
})

export class AddListComponent implements OnInit {
    
      rowsTemplates = [];
      columnsTemplates  = [
        { name: 'emails' },
        { name: 'name' },
        { name: 'size' },
        { name: 'status' }
      ];
    //templateArray:template[];
    templateCollection:AngularFirestoreCollection<List>;
    templates:Observable<List[]>;
    templateToSave:List = {id:"",name:"test",emails:"test",size:1,status:true};
    listsToSave:List[] =[];
    
    constructor(private afs:AngularFirestore) {
        this.templateCollection = this.afs.collection<List>('list');
        this.templates = this.templateCollection.valueChanges();
     }

    ngOnInit() { }

    addToTemplates(list:List){
        let uuid = UUID.UUID();
        list.id = uuid;
        this.templateCollection.add(list);
    }
    // addToTemplates(list:List){
    //     let uuid = UUID.UUID();
    //     this.templateToSave.id = uuid;
    //     debugger;
    //     this.templateCollection.add(this.templateToSave);
    // }

    public changeListener(files: FileList){
        console.log(files);
        if(files && files.length > 0) {
            Array.from(files).forEach(file => {
         //  let file : File = files.item(0); 
             console.log(file.name);
             console.log(file.size);
             console.log(file.type);
             let reader: FileReader = new FileReader();
             reader.readAsText(file);
             reader.onload = (e) => {
                let csv: string = reader.result;
                this.templateToSave.emails  = csv;
                this.templateToSave.size = csv.split(/\r\n|\r|\n/).length;
                this.templateToSave.name = file.name.replace('.csv','');
                this.templateToSave.status = true;
                this.listsToSave.push(this.templateToSave);
                this.templateToSave = {id:"",name:"test",emails:"test",size:1,status:true};
             }
          })
        }
      }


}