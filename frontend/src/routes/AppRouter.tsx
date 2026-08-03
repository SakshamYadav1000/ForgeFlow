import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// Auth Pages
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";


// Organization Pages
import OrganizationsPage from "../pages/organizations/OrganizationsPage";
import OrganizationDetailsPage from "../pages/organizations/OrganizationDetailsPage";
import OrganizationMembersPage from "../pages/organizations/OrganizationMembersPage";


// Project Pages
import ProjectsPage from "../pages/projects/ProjectsPage";
import ProjectDetailsPage from "../pages/projects/ProjectDetailsPage";


// Issue Pages
import IssuesPage from "../pages/issues/IssuesPage";
import IssueDetailsPage from "../pages/issues/IssueDetailsPage";

// Label pages
import LabelsPage from "../pages/labels/LabelsPage";
import LabelDetailsPage from "../pages/labels/LabelDetailsPage";

// Milestone pages
import MilestonesPage from "../pages/milestones/MilestonesPage";
import MilestoneDetailsPage from "../pages/milestones/MilestoneDetailsPage";

// Activity pages
import MyActivityPage from "../pages/activity/MyActivityPage";

// Other Pages
import DashboardPage from "../pages/dashboard/DashboardPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import ProfilePage from "../pages/profile/ProfilePage";

// Route Protection
import ProtectedRoute from "./ProtectedRoute";


export default function AppRouter() {

  return (
    <BrowserRouter>

      <Routes>


        {/* Default redirect */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        {/* Authentication */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />



        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* All Projects */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />


        {/* All Issues */}
        <Route
          path="/issues"
          element={
            <ProtectedRoute>
              <IssuesPage />
            </ProtectedRoute>
          }
        />

        {/* ORGANIZATIONS */}


        {/* Organization list */}
        <Route
          path="/organizations"
          element={
            <ProtectedRoute>
              <OrganizationsPage />
            </ProtectedRoute>
          }
        />


        {/* Organization details */}
        <Route
          path="/organizations/:organizationId"
          element={
            <ProtectedRoute>
              <OrganizationDetailsPage />
            </ProtectedRoute>
          }
        />


        {/* Organization members */}
        <Route
          path="/organizations/:organizationId/members"
          element={
            <ProtectedRoute>
              <OrganizationMembersPage />
            </ProtectedRoute>
          }
        />

        {/* Organization Labels */}
        <Route
          path="/organizations/:organizationId/labels"
          element={
            <ProtectedRoute>
              <LabelsPage />
            </ProtectedRoute>
          }
        />


        {/* PROJECTS */}


        {/* Organization projects */}
        <Route
          path="/organizations/:organizationId/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />


        {/* Project details */}
        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetailsPage />
            </ProtectedRoute>
          }
        />



        {/* ISSUES */}


        {/* Project issues list */}
        <Route
          path="/projects/:projectId/issues"
          element={
            <ProtectedRoute>
              <IssuesPage />
            </ProtectedRoute>
          }
        />


        {/* Issue details */}
        <Route
          path="/issues/:issueId"
          element={
            <ProtectedRoute>
              <IssueDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Label Details */}
        <Route
          path="/labels/:labelId"
          element={
            <ProtectedRoute>
              <LabelDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* // Project Milestones */}
        <Route
          path="/projects/:projectId/milestones"
          element={
            <ProtectedRoute>
              <MilestonesPage />
            </ProtectedRoute>
          }
        />


        {/* Single Milestone Details */}
        <Route
          path="/milestones/:milestoneId"
          element={
            <ProtectedRoute>
              <MilestoneDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* USER */}


        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

          <Route
 path="/activity"
 element={
  <ProtectedRoute>
    <MyActivityPage />
  </ProtectedRoute>
 }
/>

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />



        {/* Unknown routes */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />


      </Routes>

    </BrowserRouter>
  );
}