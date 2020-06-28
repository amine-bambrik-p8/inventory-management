import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CalculatorFacade } from '@workspace/core-data';

@Component({
  selector: 'workspace-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  output$ = this.calculatorFacade.output$;
  @Output()
  cancel:EventEmitter<void> = new EventEmitter();
  @Output()
  add:EventEmitter<void> = new EventEmitter();
  @Input()
  set initailValue(value){
    this.calculatorFacade.setInitialValue(value);
  }
  constructor(
    private calculatorFacade:CalculatorFacade
  ) { }

  ngOnInit(): void {
  }
  append(value:number){
    this.calculatorFacade.appendValue(value);
  }
  asFloat(){
    this.calculatorFacade.setFloat();
  }
  erase(){
    this.calculatorFacade.eraseValue();
  }
  onAdd(){
    this.add.emit();
  }
  reset(){
    this.calculatorFacade.resetValue();
  }
}
