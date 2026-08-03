import type {
  ActivityLog,
} from "../../types/activity";


interface Props {

  activity: ActivityLog;

}


export default function ActivityCard(
{
  activity,
}: Props) {


return (

<div className="rounded-lg bg-white p-4 shadow">


<p className="font-semibold">

{activity.description}

</p>


<p className="mt-2 text-sm text-gray-500">

{activity.activity_type}

</p>


<p className="mt-1 text-xs text-gray-400">

{
new Date(
activity.created_at
).toLocaleString()
}

</p>


</div>

);


}