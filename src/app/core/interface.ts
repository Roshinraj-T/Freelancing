export interface IMaster{
    id : number ;
    name  : string;
    route ?: string 
}
export interface ApiResponse {
    success: boolean; // True if the operation was successful
    message: string; // A message from the server
    data?: any; // Optional data field for additional information
  }

export interface IJobs{
    id:number;
    description : string;
    address : string ;
    jobTypeName : string;
    jobStatusName : string;
    experienceLevelName : string;
    durationName: string;
    professionName : string;
}