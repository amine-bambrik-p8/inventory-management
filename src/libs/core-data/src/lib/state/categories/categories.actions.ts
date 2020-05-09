import { ICategory } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum CategoriesActionTypes{
    LOAD_CATEGORIES='[Categories] Load',
    CATEGORIES_LOADED='[Categories] Loaded',
    CREATE_CATEGORY='[Categories] Create',
    CATEGORY_CREATED='[Categories] Created',
    UPDATE_CATEGORY='[Categories] Update',
    CATEGORY_UPDATED='[Categories] Updated',
    DELETE_CATEGORY='[Categories] Delete',
    CATEGORY_DELETED='[Categories] Deleted',
    READ_CATEGORY='[Categories] Read]',
    CATEGORY_READ='[Categories] Read Done]',
}

export class LoadCategories implements Action{
    readonly type = CategoriesActionTypes.LOAD_CATEGORIES;
}

export class CategoriesLoaded implements Action{
    readonly type = CategoriesActionTypes.CATEGORIES_LOADED;
    constructor(public payload: ICategory[]){}
}

export class CreateCategory implements Action{
    readonly type = CategoriesActionTypes.CREATE_CATEGORY;
    constructor(public payload: ICategory){}
}

export class CategoryCreated implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_CREATED;
    constructor(public payload: ICategory){}
}

export class UpdateCategory implements Action{
    readonly type = CategoriesActionTypes.UPDATE_CATEGORY;
    constructor(public payload: ICategory){}
}

export class CategoryUpdated implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_UPDATED;
    constructor(public payload: ICategory){}
}


export class DeleteCategory implements Action{
    readonly type = CategoriesActionTypes.DELETE_CATEGORY;
    constructor(public payload: ICategory){}
}

export class CategoryDeleted implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_DELETED;
    constructor(public payload: ICategory){}
}

export class ReadCategory implements Action{
    readonly type = CategoriesActionTypes.READ_CATEGORY;
    constructor(public payload: ICategory){}
}

export class CategoryRead implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_READ;
    constructor(public payload: ICategory){}
}

export type CategoriesActions = LoadCategories |
CategoriesLoaded |
CreateCategory |
CategoryCreated |
UpdateCategory |
CategoryUpdated |
DeleteCategory |
CategoryDeleted |
ReadCategory |
CategoryRead