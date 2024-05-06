export interface IMaster{
    id : number ;
    name  : string;
    route ?: string;
    color ?: string; 
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
    jobName ?: any;
    locationName : string;
    date : string | Date;
    isApplied ?: string;
    freelancerId ?: number;
}

export interface IApplicant{
    applicationId: number,
    applicantName: string,
    location: string,
    profession: string,
    experienceLevel: string;
    freelancerId :number;
    jobId :number
}