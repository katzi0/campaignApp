export class Template {
    id:string;
    uid?:string;
    isActive:boolean = true;
    name:string;
    language:string;
    product:string;
    fromName:string;
    subject:string;
    template:string;
    tinyMce?:string = "<app-tiny-editor [templateComponent]='template'  [elementId]='template.id' (onEditorContentChange)='keyupHandlerFunction($event)'></app-tiny-editor>";
}