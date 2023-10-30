import { v4 as uuidv4 } from 'uuid';

export class CourseModelResponse {
  institution_id!: string;
  course_id!: string;
  name!: string;
  adm_id!: string;

  constructor(data: any) {
    this.institution_id = data.institution_id;
    this.course_id = uuidv4();
    this.name = data.name;
    this.adm_id = data.adm_id;
  }
}
