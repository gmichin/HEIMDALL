export class RoomsModel {
  number!: number;
  chairs!: number;
  tables!: number;
  chairByTables!: number;
  computers!: number;
  capacity!: number;
  projectors!: number;
  course_id!: string;
  instituition_id!: string;
  _id?: string = '';
  status!: 'DISPONIVEL' | 'OCUPADA';
  
  constructor(data: Required<RoomsModel>) {
    this.number = data.number
    this.chairs = data.chairs
    this.tables = data.tables
    this.chairByTables = data.chairByTables
    this.computers = data.computers
    this.capacity = data.capacity
    this.projectors = data.projectors
    this.course_id = data.course_id
    this.instituition_id = data.instituition_id
    this.status = data.status ?? 'DISPONIVEL'
  }
}
