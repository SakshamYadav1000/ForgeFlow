import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import OrganizationsPage from "../pages/organizations/OrganizationsPage";
import OrganizationDetailsPage from "../pages/organizations/OrganizationDetailsPage";
import OrganizationMembersPage from "../pages/organizations/OrganizationMembersPage";
import ProtectedRoute from "./ProtectedRoute";
import ProjectsPage from "../pages/projects/ProjectsPage";
import IssuesPage from "../pages/issues/IssuesPage";
import IssueDetailsPage from "../pages/issues/IssueDetailsPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ProjectDetailsPage from "../pages/projects/ProjectDetailsPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/register"
          element={<RegisterPage />}
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId/issues"
          element={<IssuesPage />}
        />

        <Route
          path="/organizations/:organizationId"
          element={
            <ProtectedRoute>
              <OrganizationDetailsPage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/organizations/:organizationId/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizations/:organizationId/members"
          element={
            <ProtectedRoute>
              <OrganizationMembersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId"
          element={<ProjectDetailsPage />}
        />

        <Route
          path="/issues/:issueId"
          element={
            <ProtectedRoute>
              <IssueDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues"
          element={
            <ProtectedRoute>
              <IssuesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizations"
          element={
            <ProtectedRoute>
              <OrganizationsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}