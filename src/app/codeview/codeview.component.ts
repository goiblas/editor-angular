import { Component, AfterViewChecked, Input } from '@angular/core';

@Component({
  selector: 'app-codeview',
  templateUrl: './codeview.component.html',
  styleUrls: ['./codeview.component.css']
})
export class CodeviewComponent implements AfterViewChecked {
  @Input() content: string;
  
  constructor() { 
  }

  ngAfterViewChecked() {
    //update view PR.prettyPrint(); 
  }


}
