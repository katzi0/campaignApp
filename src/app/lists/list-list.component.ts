import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { List } from './list';

@Component({
    selector: 'list-list',
    templateUrl: 'list-list.component.html'
})

export class ListListComponent implements OnInit {
    listCollection: AngularFirestoreCollection<List>;
    collectionSize: Number;
    lists:Observable<List[]>;
    listColumns = [
        {name:'#'},
        // {name:'emails'},
        {name:'name'},
        {name:'size'},
        {name:'status'},
        {name:'action'}
]

searchParams: string = "";
searchCatagory:string = "id";
isAddTemplate =false;
 /*new*/
 nextKey:any;
 prevKeys:any[]=[];
 templatesArr:any;
 numOfResultsPerPage:number;

 templateToSaveDoc: AngularFirestoreDocument<List>;
 

    constructor(private afs:AngularFirestore) {
        this.afs.collection<List>('list').valueChanges().subscribe(x => (this.collectionSize = x.length, console.log("this.collectionSize: " + this.collectionSize)));
        this.lists = this.afs.collection<List>('list').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as List;
                const uid = a.payload.doc.id;
                console.log("uid:"+uid);
                return { uid, ...data };
            });
        });
     }

    ngOnInit() { }

    onKeyPressAutoComplete(searchParams: string) {
        this.searchParams = searchParams;
        this.searchCatagory = "name";
        // this.startWith.next(keyword);
        // this.endWith.next(keyword + '\uf8ff');

        this.listCollection = this.afs.collection<List>('list',
            ref => ref.orderBy('name').startAt(this.searchParams).endAt(this.searchParams + '\uf8ff'));//.limit(this.numOfResultsPerPage));
        this.lists = this.listCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as List;
                const uid = a.payload.doc.id;
                console.log("uid:"+uid);
                return { uid, ...data };
            });
        });
        
    }

    onNumOfResultsPerPageChange(numOfResultsPerPageStr) {
        console.log("onNumOfResultsPerPageChange" + numOfResultsPerPageStr);
        // if(!(searchParams)) this.templateCollection = this.afs.collection<Template>('templates', ref => ref.orderBy(this.searchCatagory).limit(this.numOfResultsPerPage)); //.startAt(this.lastVisible.id).
        // else this.templateCollection = this.afs.collection<Template>('templates',
        //         ref => ref.orderBy(this.searchCatagory).startAt(searchParams).endAt(searchParams + '\uf8ff')); 
        this.numOfResultsPerPage = parseInt(numOfResultsPerPageStr);
        
        this.listCollection = this.afs.collection<List>('list', ref => ref.orderBy(this.searchCatagory).limit(this.numOfResultsPerPage));
        
        this.lists = this.listCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as List;
                const uid = a.payload.doc.id;
                return { uid, ...data };
            });
        });

        this.lists.subscribe(x => {
            this.templatesArr = x;
            this.nextKey = x[this.numOfResultsPerPage-1].id;
            console.log("nextKey: "+this.nextKey);

            //this.nextKey = ARR.get(this.templates[this.numOfResultsPerPage],'$key');
        });// (this.lastVisible = x[x.length-1],console.log("this.lastVisible:"+this.lastVisible.uid + " currentPage:" + event)));/ this.templates.subscribe(x => (this.lastVisible = x[x.length-1],console.log("this.lastVisible:"+this.lastVisible.uid + " currentPage:" + event))); 
    }
    onTemplateContextEdit(e: List) {
        this.templateToSaveDoc = this.afs.doc<List>('/list/' + e.uid);
        this.templateToSaveDoc.update(e);
        // this.templateToSave = this.templateToSaveDoc.valueChanges();
        console.log(e);
    }
}