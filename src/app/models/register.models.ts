import { v4 as uuidv4 } from 'uuid';

export class RegisterUserRequest {
  user_id!: string;
  name!: string;
  email!: string;
  registration_number!: string;
  encrypted_password!: string;
  role_id!: string;

  constructor(data: any) {
    const id = uuidv4();
    this.user_id = id;
    this.registration_number = id;
    this.name = data.name;
    this.email = data.email;
    this.encrypted_password = data.encrypted_password;
    this.role_id = data.role_id;
  }
}

export class RegisterUserResponse {
  email!: string;
  name!: string;
  encrypted_password!: string;
  registration_number!: string;
  _id!: string;
  __v!: number;
}
