import type {
  IssueStatusCount,
} from "../../types/dashboard";


interface IssueStatusChartProps {

  data: IssueStatusCount;

}



export default function IssueStatusChart({
  data,
}: IssueStatusChartProps) {


  const statuses = [
    {
      label: "TODO",
      value: data.todo,
    },
    {
      label: "IN PROGRESS",
      value: data.in_progress,
    },
    {
      label: "DONE",
      value: data.done,
    },
  ];



  return (

    <div className="rounded-xl bg-white p-6 shadow">


      <h2 className="mb-6 text-xl font-bold">
        Issue Status
      </h2>



      <div className="space-y-5">


        {statuses.map((status) => (


          <div
            key={status.label}
          >


            <div className="mb-2 flex justify-between">


              <span className="font-medium text-gray-700">
                {status.label}
              </span>


              <span className="text-gray-500">
                {status.value}
              </span>


            </div>



            <div className="h-3 rounded-full bg-gray-200">


              <div

                className="h-3 rounded-full bg-blue-600 transition-all"

                style={{
                  width:
                    `${
                      status.value * 20
                    }%`,
                }}

              />


            </div>


          </div>


        ))}


      </div>


    </div>

  );

}