import slugify from "slugify";
import { ModuleModel, LessonModel } from "../models";

/**
|--------------------
| CHECK UNIQUE DATA
  checkUniqueSlug function for checking the slug exist in db
|--------------------
*/

const checkUniqueSlug = async (slug, modelName) => {
  let result;
  switch (modelName) {
    case "module":
      result = await ModuleModel.findOne({ slug: slug });
      break;
    case "lesson":
      result = await LessonModel.findOne({ slug: slug });
      break;
    default:
      break;
  }
  if (!result) {
    return true;
  }
  return false;
};
/**
|-------------------
|  GENERATE UNIQUE SLUG
|-------------------
*/

export const generateUniqueSlug = async (name, model) => {
  const url = slugify(name.toLowerCase(), { remove: /[*+~.()'"!:@]/g });
  let isUnique;
  isUnique = false;
  let i = 1;
  let tempUrl = url;
  while (!isUnique) {
    const result = await checkUniqueSlug(tempUrl, model);
    isUnique = result;
    if (!isUnique) {
      tempUrl = `${url}-${i}`;
      i += 1;
    }
  }
  return tempUrl;
};
