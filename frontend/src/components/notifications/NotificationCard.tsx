import type { Notification } from "../../types/notification";


interface NotificationCardProps {

  notification: Notification;

  onRead: (
    notificationId: number
  ) => void;

  onDelete: (
    notificationId: number
  ) => void;

}


export default function NotificationCard({

  notification,

  onRead,

  onDelete,

}: NotificationCardProps) {


  return (

    <div
      className={`rounded-xl p-5 shadow ${
        notification.is_read
          ? "bg-white"
          : "bg-blue-50"
      }`}
    >


      <div className="flex justify-between gap-4">


        <div>


          <h2 className="text-lg font-semibold">

            {notification.title}

          </h2>


          <p className="mt-2 text-gray-600">

            {notification.message}

          </p>


          <p className="mt-3 text-sm text-gray-400">

            Type:{" "}

            {notification.notification_type}

          </p>


          <p className="mt-1 text-sm text-gray-400">

            {new Date(
              notification.created_at
            ).toLocaleString()}

          </p>


        </div>



        <div className="flex flex-col gap-2">


          {
            !notification.is_read && (

              <button

                onClick={() =>
                  onRead(
                    notification.id
                  )
                }

                className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"

              >

                Mark Read

              </button>

            )
          }



          <button

            onClick={() =>
              onDelete(
                notification.id
              )
            }

            className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"

          >

            Delete

          </button>


        </div>


      </div>


    </div>

  );

}