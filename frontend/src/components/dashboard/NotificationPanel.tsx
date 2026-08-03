import type {
  DashboardNotification,
} from "../../types/dashboard";


interface NotificationPanelProps {

  notifications: DashboardNotification[];

}



export default function NotificationPanel({
  notifications,
}: NotificationPanelProps) {


  return (

    <div className="rounded-xl bg-white p-6 shadow">


      <div className="mb-6 flex items-center justify-between">


        <h2 className="text-xl font-bold">
          Notifications
        </h2>



        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

          {
            notifications.filter(
              (notification) =>
                !notification.is_read
            ).length
          }{" "}
          unread

        </span>


      </div>



      {
        notifications.length === 0 ? (


          <p className="text-gray-500">
            No notifications.
          </p>


        ) : (


          <div className="space-y-4">


            {
              notifications.map(
                (notification) => (


                  <div

                    key={notification.id}

                    className={`rounded-lg border p-4 ${
                      notification.is_read
                        ? "bg-gray-50"
                        : "bg-blue-50"
                    }`}

                  >


                    <div className="flex items-start gap-3">


                      <div className="text-xl">
                        🔔
                      </div>



                      <div>


                        <h3 className="font-semibold text-gray-800">

                          {
                            notification.title
                          }

                        </h3>



                        <p className="mt-1 text-sm text-gray-600">

                          {
                            notification.message
                          }

                        </p>



                        <p className="mt-2 text-xs text-gray-400">

                          {
                            new Date(
                              notification.created_at
                            ).toLocaleString()
                          }

                        </p>


                      </div>


                    </div>


                  </div>


                )
              )
            }


          </div>


        )
      }


    </div>

  );

}