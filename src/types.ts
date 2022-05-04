export interface Sort {
  by?: "id" | "title" | "body" | "userId" | "index";
  orden?: "asc" | "desc";
}

export interface Item {
  userId: number;
  id: number;
  title: string;
  body: string;
}
