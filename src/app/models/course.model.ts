import { v4 as uuidv4 } from 'uuid';

export class CourseModelResponse {
  _id!: string
  instituition!: string;
  name!: string;
  adm_id!: string;

  constructor(data: any) {
    this.instituition = data.instituition;
    this.name = data.name;
    this.adm_id = data.adm_id;
  }
}

export class CourseModelRequest {
  instituition!: string;
  name!: string;
  adm_id!: string;

  constructor(data: any) {
    this.instituition = data.instituition;
    this.name = data.name;
    this.adm_id = data.adm_id;
  }
}
