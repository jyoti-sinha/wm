import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInsertationpoint]'
})
export class InsertationpointDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}