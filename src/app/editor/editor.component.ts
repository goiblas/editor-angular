import { Component, OnInit } from '@angular/core';

export class BlockFormatting {
  key: string;
  value: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  contentEditor: any;
  content: string;
  formatting: BlockFormatting[];
  formattingBlock: string;
  codeView: boolean;
  currentTag: string;
  localStoreActive: boolean;

  constructor() {
      this.formatting = [
        {key: 'h1', value: 'Encabezado 1'},
        {key: 'h2', value: 'Encabezado 2'},
        {key: 'h3', value: 'Encabezado 3'},
        {key: 'h4', value: 'Encabezado 4'},
        {key: 'h5', value: 'Encabezado 5'},
        {key: 'h6', value: 'Encabezado 6'},
        {key: 'p', value: 'Parrafo'},
        {key: 'pre', value: 'Preformateado'}    
      ];
      this.currentTag = '';
      this.codeView = false;
      this.formattingBlock = this.formatting[6].key;
      this.content = '<p>Bienvenido!</p>';
      
   }

  ngOnInit() {
    this.contentEditor = document.getElementById('editorContent');
    this.localStoreActive = false;

    if(localStorage['editor']){
        this.content = localStorage['editor'];
        this.localStoreActive = true;
    }

  }
  
  public applyFormat(cmd:string, val?:string){
      document.execCommand(cmd, false, val); 
      this.contentEditor.focus();
  }
  
  private changeFormatting(){
    this.applyFormat('formatblock', this.formattingBlock);
  }
  private updateHtml(){
      this.content = this.contentEditor.innerHTML;
  }

  private addLink(){
    var link = prompt('Añadir enlace');
    this.applyFormat('createlink', link);
  }

  private getPosition(){
    this.updateTagPosition();
  }

  private updateTagPosition(){
     var parentEl = null;

    parentEl = window.getSelection().anchorNode;

    if(parentEl){

        if (parentEl.nodeType != 1) {
           this.currentTag = parentEl.parentNode.tagName.toLowerCase();
         }
          while(!this.isFormattingBlock(parentEl.tagName) && parentEl.parentNode){
              parentEl = parentEl.parentNode
          }

        parentEl = parentEl.tagName;
        this.formattingBlock = parentEl.toLowerCase();
    }
  }

  private isFormattingBlock(name: string){
    
      var isBlock = false;
      if(name){
        this.formatting.forEach(function(block) {
          if(block.key === name.toLowerCase() ) isBlock = true; 
        });

      }
      return isBlock;
  }


  private save(){
    this.updateHtml();
    localStorage.setItem('editor', this.content);
    this.localStoreActive = true;
  }

  private delLocalStore(){
    localStorage.clear();
    this.content = "<p>&nbsp</p>";
    this.contentEditor.focus();
    this.localStoreActive = false;
  }

}
