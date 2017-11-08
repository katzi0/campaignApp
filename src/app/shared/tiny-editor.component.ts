import {
    Component,
    AfterViewInit,
    EventEmitter,
    OnDestroy,
    Input,
    Output
  } from '@angular/core';
  
  import 'tinymce';
  import 'tinymce/themes/modern';
  
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/link';
import { Template } from '../templates/template';
  
  declare var tinymce: any;
  
  @Component({
    selector: 'app-tiny-editor',
    template: `<textarea id="{{elementId}}"></textarea>`
  })
  export class TinyEditorComponent implements AfterViewInit, OnDestroy {
    @Input () templateComponent:Template;
    @Input() elementId: String;
    @Output() onEditorContentChange = new EventEmitter();
   
    editor;
   
    ngAfterViewInit() {
      tinymce.init({
        selector: '#' + this.elementId,
        plugins: ['link', 'table'],
        skin_url: 'assets/skins/lightgray',
        setup: editor => {
          this.editor = editor;
          // this.editor.setContent('<span>some</span> html');
          editor.on('keyup', () => {
            const content = editor.getContent();
            this.onEditorContentChange.emit(content);
            // console.log("content:"+content);
          });

          editor.on('init', () => (editor.setContent(this.templateComponent)));

          // if(this.templateComponent){
          //   this.editor.setContent(this.templateComponent);
          // }
        }
      });
    }
  
    ngOnDestroy() {
      tinymce.remove(this.editor);
    }
  //   private setContent(editor, content) {
  //     if (editor && content) {
  //         this.editor.setContent(content);
  //     }
  // }
  }