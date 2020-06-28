import { map } from 'rxjs/operators';
import { AppendValue, SetFloat, EraseValue, ResetValue, SetInitialValue } from './calculator.actions';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CalculatorState, selectOutput } from './calculator.reducer';
import { Observable } from 'rxjs';
@Injectable({
    providedIn:"root"
})
export class CalculatorFacade {
    output$:Observable<number> = this.store.pipe(select(selectOutput),map((v)=>Number.parseFloat(v)));
    constructor(
        private store:Store<CalculatorState>
    ) {}
    appendValue(value:number){
        this.store.dispatch(new AppendValue(value));
    }
    setFloat(){
        this.store.dispatch(new SetFloat());
    }
    eraseValue(){
        this.store.dispatch(new EraseValue());
    }
    resetValue(){
        this.store.dispatch(new ResetValue());
    }
    setInitialValue(value:number){
        this.store.dispatch(new SetInitialValue(""+value));
    }
}