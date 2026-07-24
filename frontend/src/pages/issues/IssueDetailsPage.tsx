import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

export default function IssueDetailsPage() {
  const { issueId } = useParams();

  return (
    <MainLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Issue Details
      </h1>

      <p>Issue ID: {issueId}</p>
    </MainLayout>
  );
}