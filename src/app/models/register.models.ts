export class RegisterUserRequest {
  name!: string;
  email!: string;
  encrypted_password!: string;
  role_id!: string;
  institution_id: string = '';

  constructor(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.encrypted_password = data.encrypted_password;
    this.role_id = data.role_id;
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
}

export class RegisterUserResponse {
  _id!: string;
  email!: string;
  name!: string;
  registration_number!: string;
  encrypted_password!: string;
  role_id!: string;
  institution_id!: string;
}
