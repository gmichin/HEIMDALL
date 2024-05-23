import { v4 as uuidv4 } from 'uuid';

export class RegisterUserRequest {
  name!: string;
  email!: string;
  encrypted_password!: string;
  role!: Role;
  instituition!: Instituition;
  class!: Class[];
  registration_number: string = '';

  constructor(data: any) {
    this.registration_number = data.matricula ?? uuidv4();
    this.name = data.name;
    this.email = data.email;
    this.encrypted_password = data.encrypted_password;
    this.role = data.role;
    this.class = [];
  }
}

export interface Role {
  _id: string;
};

export interface Instituition {
  _id: string;
}

export interface Class {
  _id: string;
}

export class RegisterUserResponse {
  status: 'IDLE' | 'REJECTED' | 'CONFIRMED' = 'IDLE';
  _id!: string;
  name!: string;
  email!: string;
  encrypted_password!: string;
  role!: string;
  instituition!: Instituition;
  class!: Class[];
  registration_number: string = '';
  
  constructor(data: RegisterUserRequest) {
    this._id = uuidv4();
    this.email = data.email;
    this.name = data.name;
    this.registration_number = data.registration_number;
    this.encrypted_password = data.encrypted_password;
    this.role = data.role._id;
    this.instituition._id = data.instituition._id;
  }
}

export class RequestRegistrationUserResponse extends RegisterUserRequest {
  status: 'IDLE' | 'REJECTED' | 'CONFIRMED' = 'IDLE';
  Instituition_id!: string;
  override role!: Role;
}

export interface Role {
  _id: string;
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
