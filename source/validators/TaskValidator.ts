// import ITask from "@interfaces/task";
// import Joi, { ObjectSchema } from "joi";

// class TaskValidator {
//   static newTask(task: ITask) {
//     const schema = Joi.object<ITask>({
//       name: Joi.string().required().messages({
//         "string.base": "task name should be a string type",
//         "any.required": "task name is required",
//       }),
//     });

//     return schema.validate(task);
//   }
// }

// export default TaskValidator;
