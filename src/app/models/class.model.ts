export class ClassModel {
    _id!: string
    name!: string;
    description!: string;
    teachers_id!: string[];
    course_id!: string;
    
    constructor(data: Required<ClassModel>) {
        this.name = data.name
        this.description = data.description
        this.teachers_id = data.teachers_id
        this.course_id = data.course_id
    }
  }