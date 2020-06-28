import { MatDialog } from '@angular/material/dialog';
import { CategoriesFacade } from '@workspace/core-data';
import { ICategory, IFilter } from '@workspace/interfaces';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @Input()
  editable:boolean;
  filters:IFilter[] = [
    {
      value:"name",
      name:"Category Name"
    }
  ];
  categories$:Observable<ICategory[]> = this.categoriesFacade.allCategories$;
  constructor(
    private categoriesFacade:CategoriesFacade,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  private async loadData() {
    try {
      await this.categoriesFacade.loadCategories();
    } catch (error) {
      console.error(error);
    }
  }

  onSubmitCategory(change?:ICategory){
    const dialogRef = this.dialog.open(CategoryFormComponent,{
      data:change
    });

    dialogRef.afterClosed().subscribe(async (category:ICategory) => {
      if(category){
        try {
          if(change)
            return await this.categoriesFacade.updateCategory(category);
          await this.categoriesFacade.addCategory(category);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
  async onDelete(category:ICategory){
    try {
      await this.categoriesFacade.deleteCategory(category);
    } catch (error) {
      console.error(error);   
    }
  }
}
