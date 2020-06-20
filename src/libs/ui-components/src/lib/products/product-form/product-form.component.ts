import { IProduct, ICategory, ISupplier } from '@workspace/interfaces';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'workspace-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  form:FormGroup = this.fb.group({
    codebar:[""],
    name:[""],
    category:this.fb.group({
      id:[""],
    }),
    supplier:this.fb.group({
      id:[""],
    }),
    description:[""],
    isQuantityAlertOn:[false],
  });
  @Output()
  formSubmit:EventEmitter<IProduct> = new EventEmitter();

  @Input()
  categories:ICategory[] = [];

  @Input()
  suppliers:ISupplier[] = [];
  @Input()
  set product(value:IProduct){
    this.buildForm(value);
    this.form.patchValue(value);
  }

  private buildForm(value: IProduct) {
    if(value._id){
      this.form.addControl("_id",this.fb.control([""]));
    }
    this.form
      .get("isQuantityAlertOn")
      .valueChanges
      .subscribe(
        (isQuantityAlertOn)=>this.onToggleQuantityAlert(isQuantityAlertOn)
      );
    this.form
    .get("isQuantityAlertOn")
    .setValue(!!value.quantityAlert);
  }

  get isQuantityAlertOn(): boolean{
    return this.form.get("isQuantityAlertOn").value;
  }
  constructor(
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    
  }
  onToggleQuantityAlert(toggle): void{
    if(toggle){
      this.form.addControl("quantityAlert",
        this.fb.group({
            maxQuantity:[0],
            minQuantity:[0]
        })
      );
    }else{
     this.form.removeControl("quantityAlert");
    }
    
  }
  onSubmit(){
    const {isQuantityAlertOn,...product} = this.form.value;
    this.formSubmit.emit(product);
  }
}
