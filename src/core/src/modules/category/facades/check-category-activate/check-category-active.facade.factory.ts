import { CheckCategoryActiveFacadeImp } from "./check-category-active.facade.imp";
import { CheckCategoryActiveFacadeInteface } from "./check-category-active.facade.interface";

export class CheckCategoryActiveFacadeFactory {
    static create(): CheckCategoryActiveFacadeInteface {
        return new CheckCategoryActiveFacadeImp()
    }
}