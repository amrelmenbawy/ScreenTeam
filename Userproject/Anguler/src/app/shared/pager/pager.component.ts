import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent {
@Input() totalCount?:number;
@Input() pageSize?:number;
@Output() pageChanged =new EventEmitter<number>();
onPagerChanged(e:any){
  this.pageChanged.emit(e);
  debugger
}
}
