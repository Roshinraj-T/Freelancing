export interface IMaster{
    id : number ;
    name  : string;
    route ?: string; 
}
export interface ApiResponse {
    success: boolean; // True if the operation was successful
    message: string; // A message from the server
    data?: any; // Optional data field for additional information
  }