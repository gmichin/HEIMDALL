import { v4 as uuidv4 } from 'uuid';

export class RegisterUserRequest {
  user_id!: string;
  name!: string;
  email!: string;
  registration_number!: string;
  encrypted_password!: string;
  role_id!: string;
  institution_id: string = '';

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

export class RegisterInstitutionRequest {
  institution_id!: string;
  name!: string;
  address!: string;
  phone!: string;
  email!: string;

  constructor(data: any) {
    const id = uuidv4();
    this.institution_id = id;
    this.name = data.nameInstitution;
    this.email = data.emailInstitution;
    this.phone = data.phoneInstitution;
    this.address = data.addressInstitution;
  }
}

export class RegisterInstitutionResponse {
  name!: string;
  address!: string;
  phone!: string;
  email!: string;
  _id!: string;
  __v!: number;
}

export class RegisterUserResponse {
  _id!: string;
  email!: string;
  name!: string;
  registration_number!: string;
  encrypted_password!: string;
  role_id!: string;
  __v!: number;
  institution_id!: string;
}
