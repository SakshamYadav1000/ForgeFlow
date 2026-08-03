import { useEffect, useState } from "react";

import {
    getIssueActivity,
} from "../../services/activityService";

import type {
    ActivityLog,
} from "../../types/activity";


import ActivityCard from "./ActivityCard";


interface Props {

    issueId:number;

}


export default function ActivitySection({
    issueId,
}:Props){


const [activities,setActivities]=
    useState<ActivityLog[]>([]);


const [loading,setLoading]=
    useState(true);



useEffect(()=>{


const fetchActivity = async()=>{


try{

const data =
 await getIssueActivity(issueId);


setActivities(data);


}
catch(error){

console.error(error);

}
finally{

setLoading(false);

}


};


fetchActivity();


},[issueId]);




return (

<div className="mt-8">


<h2 className="text-xl font-bold mb-4">
Activity
</h2>


{
loading ? (

<p>
Loading activity...
</p>


):

activities.length===0?(

<p className="text-gray-500">
No activity yet.
</p>


):

(

<div className="space-y-3">

{
activities.map((activity)=>(

<ActivityCard

key={activity.id}

activity={activity}

/>

))

}

</div>

)

}


</div>

);


}