export class getUserRequest {
  email!: string;
  password!: string;

  constructor(data: Required<getUserRequest>) {
    Object.assign(this, data);
  }
}

export class getUserResponse {
  _id!: string;
  institution_id!: string;
  email!: string;
  username!: string;
  password!: string;
}
