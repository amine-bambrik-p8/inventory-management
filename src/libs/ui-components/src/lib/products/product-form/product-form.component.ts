import { IProduct, ICategory, ISupplier } from '@workspace/interfaces';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesFacade, SuppliersFacade } from '@workspace/core-data';
import { Observable } from 'rxjs';
export class ProductForm{
  form:FormGroup;
  constructor(private fb:FormBuilder){}
  protected buildForm(value?: IProduct) {
    const form:any= {
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
    };
    if(value && value._id){
      form._id=[""];
    }
    this.form = this.fb.group(form);
    this.form
      .get("isQuantityAlertOn")
      .valueChanges
      .subscribe(
        (isQuantityAlertOn)=>this.toggleQuantityAlert(isQuantityAlertOn)
      );
    this.form
    .get("isQuantityAlertOn")
    .setValue(value && !!value.quantityAlert);
  }
  protected toggleQuantityAlert(toggle): void{
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
  get isQuantityAlertOn(): boolean{
    return this.form.get("isQuantityAlertOn").value;
  }
  get value(){
    const {isQuantityAlertOn,...product} = this.form.value;
    return product;
  }
}
@Component({
  selector: 'workspace-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends ProductForm implements OnInit {
  @Output()
  formSubmit:EventEmitter<IProduct> = new EventEmitter();
  @Input()
  set product(value:IProduct){
    this.buildForm(value);
    this.form.patchValue(value);
  }

  suppliers$:Observable<ISupplier[]> = this.suppliersFacade.allSuppliers$;
  categories$:Observable<ICategory[]> = this.categoriesFacade.allCategories$;
  
  constructor(
    fb:FormBuilder,
    private categoriesFacade:CategoriesFacade,
    private suppliersFacade:SuppliersFacade
  ) { super(fb) }

  ngOnInit(): void {
    this.categoriesFacade.loadCategories();
    this.suppliersFacade.loadSuppliers();
  }
  
}
