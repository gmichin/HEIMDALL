import { formatISO } from "date-fns";

export class ReserveModel {
  room_id!: string;
  user_id!: string;
  class_id!: string;
  start_time!: string;
  end_time!: string;
  _id!: string
    
    constructor(data: Required<ReserveModel>) {
        const dateS = new Date(data.start_time);
        const dateE = new Date(data.end_time);
        this.room_id = data.room_id;
        this.user_id = data.user_id;
        this.class_id = data.class_id;
        this.start_time = formatISO(dateS);
        this.end_time = formatISO(dateE);
    }
  }