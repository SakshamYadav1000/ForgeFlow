import {
useEffect,
useState,
} from "react";


import MainLayout from "../../layouts/MainLayout";


import ActivityCard from "../../components/activity/ActivityCard";


import {
getMyActivity,
} from "../../services/activityService";


import type {
ActivityLog,
} from "../../types/activity";



export default function MyActivityPage(){


const [activities,setActivities]
=
useState<ActivityLog[]>([]);



const [loading,setLoading]
=
useState(true);



const fetchActivity = async()=>{


try{


const data =
await getMyActivity();


setActivities(data);


}
catch(error){

console.error(error);

}
finally{

setLoading(false);

}


};



useEffect(()=>{

fetchActivity();

},[]);



return (

<MainLayout>


<h1 className="mb-8 text-3xl font-bold">

My Activity

</h1>



{
loading ? (

<p>
Loading...
</p>


) :

activities.length===0 ? (

<p>
No activity found.
</p>


)

:

(

<div className="space-y-4">

{
activities.map(
(activity)=>(

<ActivityCard

key={activity.id}

activity={activity}

/>

))
}

</div>

)

}



</MainLayout>

);


}