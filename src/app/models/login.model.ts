export class getUserRequest {
  email!: string;
  password!: string;

  constructor(data: Required<getUserRequest>) {
    Object.assign(this, data);
  }
}

export class getUserResponse {
  _id!: string;
  Instituition_id!: string;
  email!: string;
  username!: string;
  password!: string;
}
