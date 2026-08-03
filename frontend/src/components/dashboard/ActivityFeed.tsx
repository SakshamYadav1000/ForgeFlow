import type {
  DashboardActivity,
} from "../../types/dashboard";


interface ActivityFeedProps {

  activities: DashboardActivity[];

}



export default function ActivityFeed({
  activities,
}: ActivityFeedProps) {


  return (

    <div className="rounded-xl bg-white p-6 shadow">


      <h2 className="mb-6 text-xl font-bold">
        Recent Activity
      </h2>



      {activities.length === 0 ? (

        <p className="text-gray-500">
          No recent activity.
        </p>


      ) : (


        <div className="space-y-4">


          {activities.map((activity) => (


            <div

              key={activity.id}

              className="flex items-start gap-3"

            >


              <div className="mt-1 text-green-600">
                ✓
              </div>



              <div>


                <p className="font-medium text-gray-800">
                  {activity.description}
                </p>


                <p className="text-sm text-gray-400">
                  {
                    new Date(
                      activity.created_at
                    ).toLocaleString()
                  }
                </p>


              </div>


            </div>


          ))}


        </div>


      )}


    </div>

  );

}