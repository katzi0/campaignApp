import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Template } from './template';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AddTemplateComponent } from './add-template.component';

import * as ARR from 'lodash';

/* tinyMce */
import { TinyEditorComponent } from '../shared/tiny-editor.component';


@Component({
    selector: 'template-list',
    templateUrl: './template-list.html',
    styleUrls:  ['./style.scss']
})

export class TemplateListComponent implements OnInit {

    selectedTemplate: Template;
    rawClicked: boolean = false;
    templateColumns = [
        {name:'#'},
        { name: 'name' },
        { name: 'language' },
        { name: 'product' },
        {name:'fromName'},
        { name: 'subject' },
        { name: 'template' },
        { name: 'action' }
    ];


    templateCollection: AngularFirestoreCollection<Template>;
    templates: Observable<Template[]>;
    // templatesArr: Array<Template>;
    // editedTemplate: Template;
    numOfResultsPerPageStr: string = "10";
    numOfResultsPerPage: number = 10;
    collectionSize: Number;
    // lastVisibleObs: Observable<string>;
    // lastVisible;
    // firstVisible;

    /*new*/
    nextKey:any;
    prevKeys:any[]=[];
    templatesArr:any;

    templateToSaveDoc: AngularFirestoreDocument<Template>;
    // templateToSave: Observable<Template>;

    searchParams: string = "";
    searchCatagory:string = "id";

    isAddTemplate =false;

    constructor(private afs: AngularFirestore) {
        this.onNumOfResultsPerPageChange();
        this.afs.collection<Template>('templates').valueChanges().subscribe(x => (this.collectionSize = x.length, console.log("this.collectionSize: " + this.collectionSize)));
    }

    ngOnInit() { }

    onTemplateContextEdit(e: Template) {
        this.templateToSaveDoc = this.afs.doc<Template>('/templates/' + e.uid);
        this.templateToSaveDoc.update(e);
        // this.templateToSave = this.templateToSaveDoc.valueChanges();
        console.log(e);

    }

    onNumOfResultsPerPageChange(searchParams?) {
        console.log("onNumOfResultsPerPageChange" + this.numOfResultsPerPageStr);
        this.numOfResultsPerPage = parseInt(this.numOfResultsPerPageStr);
        // if(!(searchParams)) this.templateCollection = this.afs.collection<Template>('templates', ref => ref.orderBy(this.searchCatagory).limit(this.numOfResultsPerPage)); //.startAt(this.lastVisible.id).
        // else this.templateCollection = this.afs.collection<Template>('templates',
        //         ref => ref.orderBy(this.searchCatagory).startAt(searchParams).endAt(searchParams + '\uf8ff')); 
        this.templateCollection = this.afs.collection<Template>('templates', ref => ref.orderBy(this.searchCatagory).limit(this.numOfResultsPerPage));
        
        this.templates = this.templateCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Template;
                const uid = a.payload.doc.id;
                return { uid, ...data };
            });
        });

        this.templates.subscribe(x => {
            this.templatesArr = x;
            this.nextKey = x[this.numOfResultsPerPage-1].id;
            console.log("nextKey: "+this.nextKey);

            //this.nextKey = ARR.get(this.templates[this.numOfResultsPerPage],'$key');
        });// (this.lastVisible = x[x.length-1],console.log("this.lastVisible:"+this.lastVisible.uid + " currentPage:" + event)));/ this.templates.subscribe(x => (this.lastVisible = x[x.length-1],console.log("this.lastVisible:"+this.lastVisible.uid + " currentPage:" + event))); 
    }

    onPageClick(event) {
        if (event == "next") {
            this.prevKeys.push(ARR.first(this.templatesArr)[this.searchCatagory]);
            // this.prevKeys.push(this.templates[0].id);
            this.templateCollection = this.afs.collection<Template>('templates', ref => ref.orderBy(this.searchCatagory).startAfter(this.nextKey).limit(this.numOfResultsPerPage));
        }
        else {
            this.templateCollection = this.afs.collection<Template>('templates', ref => ref.orderBy(this.searchCatagory).startAt(this.prevKeys[this.prevKeys.length-1]).limit(this.numOfResultsPerPage));
            this.prevKeys.pop();
            // this.templateCollection = this.afs.collection<Template>('templates', ref => ref.orderBy('id').endBefore(this.firstVisible.id).limit(this.numOfResultsPerPage));
        }

        this.templates = this.templateCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Template;
                const uid = a.payload.doc.id;
                return { uid, ...data };
            });
        });
        this.templates.subscribe(x => {
            
            this.templatesArr = x;
            if(x[this.numOfResultsPerPage-1]) this.nextKey = this.templatesArr[this.numOfResultsPerPage-1][this.searchCatagory];
            else this.nextKey = x[x.length-1][this.searchCatagory];
            console.log(this.nextKey);
        });
    }
    onKeyPressAutoComplete(event: KeyboardEvent) {
        this.searchParams = (<HTMLInputElement>event.target).value;
        this.searchCatagory = "name";
        // this.startWith.next(keyword);
        // this.endWith.next(keyword + '\uf8ff');

        this.templateCollection = this.afs.collection<Template>('templates',
            ref => ref.orderBy('name').startAt(this.searchParams).endAt(this.searchParams + '\uf8ff'));//.limit(this.numOfResultsPerPage));
        this.templates = this.templateCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Template;
                const uid = a.payload.doc.id;
                return { uid, ...data };
            });
        });
    }
}
