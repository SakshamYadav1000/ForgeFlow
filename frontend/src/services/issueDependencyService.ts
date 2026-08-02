import api from "./api";

import type {
  IssueDependency,
  CreateDependencyRequest,
} from "../types/issueDependency";



// POST /issues/{issueId}/dependencies
export const createDependency = async (

  issueId: number,

  data: CreateDependencyRequest

): Promise<IssueDependency> => {


  const response = await api.post(

    `/issues/${issueId}/dependencies`,

    data

  );


  return response.data;

};




// GET /issues/{issueId}/dependencies
export const getDependencies = async (

  issueId: number

): Promise<IssueDependency[]> => {


  const response = await api.get(

    `/issues/${issueId}/dependencies`

  );


  return response.data;

};




// DELETE /issues/{issueId}/dependencies/{dependencyId}
export const deleteDependency = async (

  issueId: number,

  dependencyId: number

): Promise<void> => {


  await api.delete(

    `/issues/${issueId}/dependencies/${dependencyId}`

  );

};