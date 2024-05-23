export class ReserveModel {
  room_id!: string;
  user_id!: string;
  class_id!: string;
  start_time!: string;
  end_time!: string;
  _id!: string
    
    constructor(data: Required<ReserveModel>) {
        this.room_id = data.room_id;
        this.user_id = data.user_id;
        this.class_id = data.class_id;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
    }
  }