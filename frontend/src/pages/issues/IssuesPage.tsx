import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import IssueCard from "../../components/issues/IssueCard";
import CreateIssueModal from "../../components/issues/CreateIssueModal";

import {
  getProjectIssues,
  createIssue,
  getIssues,
} from "../../services/issueService";

import type {
  Issue,
  IssuePriority,
} from "../../types/issue";


export default function IssuesPage() {

  // Project ID from URL
  const { projectId } = useParams();


  // Issues state
  const [issues, setIssues] =
    useState<Issue[]>([]);


  // Loading state
  const [loading, setLoading] =
    useState(true);



  // Fetch all issues of project
  const fetchIssues = async () => {

    try {

      let data: Issue[];


      if (projectId) {

        data =
          await getProjectIssues(
            Number(projectId)
          );

      } else {

        data =
          await getIssues();

      }


      setIssues(data);


    } catch (error) {

      console.error(error);


    } finally {

      setLoading(false);

    }

  };



  // Load issues when page opens
  useEffect(() => {

    fetchIssues();

  }, [projectId]);




  // Create new issue
  const handleCreateIssue = async (
    title: string,
    description: string,
    priority: IssuePriority,
    assignee_id: number | null,
    milestone_id: number | null
  ) => {


    if (!projectId) {

      alert(
        "Open a project to create an issue."
      );

      return;

    }


    try {


      await createIssue(
        Number(projectId),
        {
          title,
          description,
          priority,
          assignee_id,
          milestone_id,
        }
      );



      // Refresh list after creation
      await fetchIssues();



      alert(
        "Issue created successfully!"
      );


    } catch (error) {


      console.error(error);


      alert(
        "Failed to create issue."
      );

    }

  };



  return (

    <MainLayout>


      {/* Page Header */}

      <div className="mb-8 flex items-center justify-between">


        <h1 className="text-3xl font-bold">
          Issues
        </h1>



        {/* 
          POST /projects/{project_id}/issues
        */}

        {
          projectId && (
            <CreateIssueModal
              onCreate={handleCreateIssue}
            />
          )
        }


      </div>





      {/* 
        GET /projects/{project_id}/issues
      */}

      {loading ? (


        <p>
          Loading...
        </p>



      ) : issues.length === 0 ? (


        <p>
          No issues found.
        </p>



      ) : (


        <div className="grid gap-4">


          {issues.map((issue) => (


            <IssueCard

              key={issue.id}

              issue={issue}

            />


          ))}


        </div>


      )}



    </MainLayout>

  );

}