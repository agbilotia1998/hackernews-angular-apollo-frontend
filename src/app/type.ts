export class Link {
  id: string;
  description: string;
  url: string;
  createdAt: string;
}

export class User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
}


export class Vote {
  id: string;
  user: User;
  link: Link;
}
