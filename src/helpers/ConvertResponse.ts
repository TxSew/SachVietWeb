export function flattenCategories(categories:any, result:any = []) {
    for (const category of categories) {
         if(category) {
             result.push(category);
         }
      if (category.subcategories && category.subcategories.length > 0) {
        flattenCategories(category.subcategories, result);
      }
    }
    return result;
  }