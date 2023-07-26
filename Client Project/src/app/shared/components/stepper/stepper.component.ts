import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers:[{provide:CdkStepper,useExisting:StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit{
  
@Input() linearModuleSelected=true;

ngOnInit(): void {
  this.linear=this.linearModuleSelected;
}

onClick(index:number)
{
  this.selectedIndex=index;
}
}
