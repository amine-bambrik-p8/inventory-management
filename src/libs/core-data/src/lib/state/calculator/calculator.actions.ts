import { Action } from '@ngrx/store';
export enum CalculatorActionTypes {
    APPEND_VALUE = "[Calculator] Append Value",
    SET_FLOAT = "[Calculator] Set Float",
    SET_INITIAL_VALUE = "[Calculator] Set Initial Value",
    RESET_VALUE = "[Calculator] Reset Value",
    ERASE_VALUE = "[Calculator] Erase Value"
}
export class AppendValue implements Action{
    type = CalculatorActionTypes.APPEND_VALUE;
    constructor(public payload:number){}
}
export class SetFloat implements Action {
    type = CalculatorActionTypes.SET_FLOAT;
    constructor(public payload?){}
}
export class EraseValue implements Action {
    type = CalculatorActionTypes.ERASE_VALUE;
    constructor(public payload?){}
}
export class ResetValue implements Action {
    type = CalculatorActionTypes.RESET_VALUE;
    constructor(public payload?){}
}
export class SetInitialValue implements Action {
    type = CalculatorActionTypes.SET_INITIAL_VALUE;
    constructor(public payload:string|number){}
}
export type CalculatorActions = 
AppendValue |
SetFloat |
SetInitialValue |
ResetValue |
EraseValue;
