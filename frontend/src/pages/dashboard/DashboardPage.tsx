import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import StatCard from "../../components/dashboard/StatCard";
import IssueStatusChart from "../../components/dashboard/IssueStatusChart";
import PriorityChart from "../../components/dashboard/PriorityChart";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import NotificationPanel from "../../components/dashboard/NotificationPanel";

import {
  getDashboard,
} from "../../services/dashboardService";

import type {
  DashboardResponse,
} from "../../types/dashboard";



export default function DashboardPage() {


  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);



  const [loading, setLoading] =
    useState(true);



  const fetchDashboard = async () => {

    try {

      const data =
        await getDashboard();


      setDashboard(data);


    } catch(error) {

      console.error(
        "Failed to fetch dashboard",
        error
      );


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchDashboard();

  }, []);





  return (

    <MainLayout>


      {
        loading ? (

          <p>
            Loading dashboard...
          </p>


        ) : dashboard ? (


          <div className="space-y-8">


            {/* Header */}

            <div>

              <h1 className="text-3xl font-bold">
                ForgeFlow Dashboard
              </h1>


              <p className="mt-2 text-gray-500">
                Overview of your projects, issues and activities
              </p>

            </div>





            {/* Statistics Cards */}

            <div className="grid gap-6 md:grid-cols-4">


              <StatCard

                title="Organizations"

                value={
                  dashboard.organizations
                }

              />



              <StatCard

                title="Projects"

                value={
                  dashboard.projects
                }

              />



              <StatCard

                title="Assigned Issues"

                value={
                  dashboard.assigned_issues
                }

              />



              <StatCard

                title="Reported Issues"

                value={
                  dashboard.reported_issues
                }

              />


            </div>





            {/* Charts */}

            <div className="grid gap-6 md:grid-cols-2">


              <IssueStatusChart

                data={
                  dashboard.issue_status
                }

              />



              <PriorityChart

                data={
                  dashboard.priority
                }

              />


            </div>





            {/* Activity + Notifications */}

            <div className="grid gap-6 md:grid-cols-2">


              <ActivityFeed

                activities={
                  dashboard.recent_activity
                }

              />



              <NotificationPanel

                notifications={
                  dashboard.notifications
                }

              />


            </div>



          </div>


        ) : (


          <p>
            Failed to load dashboard.
          </p>


        )
      }


    </MainLayout>

  );

}