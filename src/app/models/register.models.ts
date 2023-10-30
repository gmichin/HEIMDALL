import { v4 as uuidv4 } from 'uuid';

export class RegisterUserRequest {
  name!: string;
  email!: string;
  encrypted_password!: string;
  role_id!: string;
  institution_id: string = '';
  registration_number: string = '';

  constructor(data: any) {
    this.registration_number = uuidv4();
    this.name = data.name;
    this.email = data.email;
    this.encrypted_password = data.encrypted_password;
    this.role_id = data.role_id;
  }
}

export class RegisterUserResponse {
  _id!: string;
  email!: string;
  name!: string;
  registration_number!: string;
  encrypted_password!: string;
  role_id!: string;
  institution_id!: string;

  constructor(data: RegisterUserRequest) {
    this._id = uuidv4();
    this.email = data.email;
    this.name = data.name;
    this.registration_number = data.registration_number;
    this.encrypted_password = data.encrypted_password;
    this.role_id = data.role_id;
    this.institution_id = data.institution_id;
  }
}

export class RegisterInstitutionRequest {
  name!: string;
  address!: string;
  phone!: string;
  email!: string;

  constructor(data: any) {
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
  constructor(data: RegisterInstitutionRequest) {
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.email = data.email;
    this._id = uuidv4();
  }
}
