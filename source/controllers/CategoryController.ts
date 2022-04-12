
import ICategory from '@interfaces/category';
import CategoryRepository from '@repositories/CategoryRepository';
import AppError from '@utils/AppError';
import AppResponse from '@utils/AppResponse';
import CategoryValidator from '@validators/v1/CategoryValidator';

import { NextFunction, Request, Response } from 'express';



class CategoryController {

    private readonly categoryRepository : CategoryRepository;

    constructor(){
      this.categoryRepository = new CategoryRepository();
    }
    addNewCategory = async (req: Request, res: Response, next: NextFunction)=> {
      const validationResult = CategoryValidator.create(req.body as ICategory);

      if(validationResult.error) {
          return next(new AppError(validationResult.error.details[0].message , 400));
      }
      const newCategory = await this.categoryRepository.create(req.body);
      return AppResponse.success(res , {category : newCategory} , 'success' , 201);
    }

}

export default CategoryController;
