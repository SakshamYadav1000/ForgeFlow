import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import NotificationCard from "../../components/notifications/NotificationCard";

import type {
  Notification,
} from "../../types/notification";


import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../../services/notificationService";



export default function NotificationsPage() {


  const [
    notifications,
    setNotifications,
  ] = useState<Notification[]>([]);



  const [
    loading,
    setLoading,
  ] = useState(true);



  const fetchNotifications = async () => {

    try {

      const data =
        await getNotifications();

      setNotifications(data);


    } catch(error){

      console.error(error);


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchNotifications();

  }, []);




  const handleRead = async (
    id:number
  ) => {

    try {

      await markNotificationAsRead(
        id
      );

      await fetchNotifications();


    } catch(error){

      console.error(error);

    }

  };




  const handleReadAll = async () => {

    try {

      await markAllNotificationsAsRead();

      await fetchNotifications();


    } catch(error){

      console.error(error);

    }

  };




  const handleDelete = async (
    id:number
  ) => {


    const confirmed =
      window.confirm(
        "Delete this notification?"
      );


    if(!confirmed) return;


    try {

      await deleteNotification(
        id
      );

      await fetchNotifications();


    } catch(error){

      console.error(error);

    }

  };




  return (

    <MainLayout>


      <div className="mb-8 flex items-center justify-between">


        <h1 className="text-3xl font-bold">

          Notifications

        </h1>



        <button

          onClick={handleReadAll}

          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"

        >

          Mark All Read

        </button>


      </div>




      {
        loading ? (

          <p>
            Loading...
          </p>


        ) : notifications.length === 0 ? (

          <p className="text-gray-500">

            No notifications.

          </p>


        ) : (

          <div className="space-y-5">


            {
              notifications.map(
                notification => (

                  <NotificationCard

                    key={
                      notification.id
                    }

                    notification={
                      notification
                    }

                    onRead={
                      handleRead
                    }

                    onDelete={
                      handleDelete
                    }

                  />

                )
              )
            }


          </div>

        )
      }



    </MainLayout>

  );

}