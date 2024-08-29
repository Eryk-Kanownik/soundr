export interface IResponseFormat {
  type: "Success" | "Failure";
  message: string;
  body?: any;
}
