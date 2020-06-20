import { ICategory } from '@workspace/interfaces';
import { Action } from '@ngrx/store';

export enum CategoriesActionTypes{
    LOAD_CATEGORIES='[Categories] Load',
    CATEGORIES_LOADED='[Categories] Loaded',
    CATEGORIES_LOAD_FAIL='[Categories] Load Fail',
    CREATE_CATEGORY='[Categories] Create',
    CATEGORY_CREATED='[Categories] Created',
    CATEGORY_CREATE_FAIL='[Categories] Create Fail',
    UPDATE_CATEGORY='[Categories] Update',
    CATEGORY_UPDATED='[Categories] Updated',
    CATEGORY_UPDATE_FAIL='[Categories] Updated Fail',
    DELETE_CATEGORY='[Categories] Delete',
    CATEGORY_DELETED='[Categories] Deleted',
    CATEGORY_DELETE_FAIL='[Categories] Delete Fail',
    READ_CATEGORY='[Categories] Read]',
    CATEGORY_READ='[Categories] Read Done]',
    CATEGORY_READ_FAIL='[Categories] Read Fail]',
}

export class LoadCategories implements Action{
    readonly type = CategoriesActionTypes.LOAD_CATEGORIES;
}

export class CategoriesLoaded implements Action{
    readonly type = CategoriesActionTypes.CATEGORIES_LOADED;
    constructor(public payload: ICategory[]){}
}

export class CategoriesLoadFail implements Action{
    readonly type = CategoriesActionTypes.CATEGORIES_LOAD_FAIL;
    constructor(public payload: any){}
}

export class CreateCategory implements Action{
    readonly type = CategoriesActionTypes.CREATE_CATEGORY;
    constructor(public payload: ICategory){}
}

export class CategoryCreated implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_CREATED;
    constructor(public payload: ICategory){}
}

export class CategoryCreateFail implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_CREATE_FAIL;
    constructor(public payload: any){}
}

export class UpdateCategory implements Action{
    readonly type = CategoriesActionTypes.UPDATE_CATEGORY;
    constructor(public payload: ICategory){}
}

export class CategoryUpdated implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_UPDATED;
    constructor(public payload: ICategory){}
}
export class CategoryUpdateFail implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_UPDATE_FAIL;
    constructor(public payload: any){}
}


export class DeleteCategory implements Action{
    readonly type = CategoriesActionTypes.DELETE_CATEGORY;
    constructor(public payload: ICategory){}
}

export class CategoryDeleted implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_DELETED;
    constructor(public payload: ICategory){}
}

export class CategoryDeleteFail implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_DELETE_FAIL;
    constructor(public payload: ICategory){}
}

export class ReadCategory implements Action{
    readonly type = CategoriesActionTypes.READ_CATEGORY;
    constructor(public payload: string){}
}

export class CategoryRead implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_READ;
    constructor(public payload: ICategory){}
}
export class CategoryReadFail implements Action{
    readonly type = CategoriesActionTypes.CATEGORY_READ_FAIL;
    constructor(public payload: any){}
}

export const isActionTypeFail = (action:CategoriesActions):boolean => {
    return action.type === CategoriesActionTypes.CATEGORIES_LOAD_FAIL
        || action.type === CategoriesActionTypes.CATEGORY_UPDATE_FAIL
        || action.type === CategoriesActionTypes.CATEGORY_DELETE_FAIL
        || action.type === CategoriesActionTypes.CATEGORY_CREATE_FAIL
        || action.type === CategoriesActionTypes.CATEGORY_READ_FAIL
}
export const isActionTypeSuccess = (action:CategoriesActions):boolean => {
    return action.type === CategoriesActionTypes.CATEGORIES_LOADED
        || action.type === CategoriesActionTypes.CATEGORY_UPDATED
        || action.type === CategoriesActionTypes.CATEGORY_DELETED
        || action.type === CategoriesActionTypes.CATEGORY_CREATED
        || action.type === CategoriesActionTypes.CATEGORY_READ
}

export type CategoriesActions = LoadCategories |
CategoriesLoaded |
CategoriesLoadFail |
CreateCategory |
CategoryCreated |
CategoryCreateFail |
UpdateCategory |
CategoryUpdated |
CategoryUpdateFail |
DeleteCategory |
CategoryDeleted |
CategoryDeleteFail |
ReadCategory |
CategoryRead | 
CategoryReadFail