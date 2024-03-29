export class ServiceRequests {
  serviceId: number;
  serviceName: string;
  requests: EventServices[];

  constructor() {
    this.requests = new Array<EventServices>();
  }
}


export class EventServices {
  eventId: number;
  message: string;
  eventName: string;
  userName: string;
  userEmail: string;
}

export class UserRequests {
  eventId: number;
  serviceId: number;
  serviceName: string;
  eventName: string;
  reply: string;
  message: string;
  responded: boolean;
  booked: boolean;
  status: string;
}
