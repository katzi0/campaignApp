import {Component, Input, Output, EventEmitter} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { TinyEditorComponent } from '../tiny-editor.component';
import { Template } from '../../templates/template';

// @Component({
//   selector: 'ngbd-modal-content',
//   template: `
//     <div class="modal-header">
//       <h4 class="modal-title">Hi there!</h4>
//       <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body">
//       <p>Hello, {{name}}!</p>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
//     </div>
//   `
// })
// export class NgbdModalContent {
//   @Input() name;

//   constructor(public activeModal: NgbActiveModal) {}
// }

@Component({
  selector: 'ngbd-modal',
  templateUrl: './modal.component.html',
  styles:['.btn {cursor:pointer}']
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}
  @Input() templateComponent;
  @Input() elementId;
  @Output() onEditorContentChange = new EventEmitter();
  open() {
    const modalRef = this.modalService.open(TinyEditorComponent);
    modalRef.componentInstance.templateComponent = this.templateComponent;
    modalRef.componentInstance.elementId = this.elementId;
    modalRef.componentInstance.onEditorContentChange.subscribe(($e) => {
        this.keyupHandlerFunction($e);
      })
  }

//   ngOnChanges(changes: string) {
//     // changes.prop contains the old and the new value...
//   }

  keyupHandlerFunction(e):void{
    console.log(e);
    this.onEditorContentChange.emit(e); //e is the HTML output from your TinyMCE component
    }
}