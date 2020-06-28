import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CalculatorActions, CalculatorActionTypes } from './calculator.actions';
export interface CalculatorState{
    output:string;
    initialValue?:number;
    isInitialValue:boolean;
    isFloat:boolean;
}
const initialState:CalculatorState = {
    output:"0",
    isFloat:false,
    isInitialValue:false,
    initialValue:0
}
export function calculatorReducer(state:CalculatorState=initialState,action:CalculatorActions):CalculatorState{
    switch (action.type) {
        case CalculatorActionTypes.RESET_VALUE:
            return {...initialState,output:""+state.initialValue};
        case CalculatorActionTypes.ERASE_VALUE:
            let output = state.output;
            const lastChar = state.output.substring(state.output.length-1,state.output.length)
            output=output.substring(0,state.output.length-1);
            if(!output)
                return {...initialState,initialValue:state.initialValue,isInitialValue:state.isInitialValue};
            return {...state,isFloat:state.isFloat && lastChar!==".",output:output};
        case CalculatorActionTypes.SET_INITIAL_VALUE:
            return {...state,isInitialValue:true,initialValue:action.payload,output:""+action.payload};
        case CalculatorActionTypes.APPEND_VALUE:
            if(state.output !== "0" && !state.isInitialValue){
                return {...state,output:state.output+action.payload};
            }
            return {...state,isInitialValue:false,output:''+action.payload};
        case CalculatorActionTypes.SET_FLOAT:
            if(state.isFloat)
                return state;
            return {...state,isInitialValue:false,isFloat:true,output:state.output+"."};
        default:
            return state;
    }
}
const selectCalculatorState = createFeatureSelector<CalculatorState>("calculator");
export const selectOutput = createSelector(selectCalculatorState,(cal:CalculatorState)=>{
    return cal.output;
});
export const selectIsFloat = createSelector(selectCalculatorState,(cal:CalculatorState)=>{
    return cal.isFloat;
});