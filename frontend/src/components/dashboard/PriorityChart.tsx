import type {
  PriorityCount,
} from "../../types/dashboard";


interface PriorityChartProps {

  data: PriorityCount;

}



export default function PriorityChart({
  data,
}: PriorityChartProps) {


  const priorities = [
    {
      label: "HIGH",
      value: data.high,
    },
    {
      label: "MEDIUM",
      value: data.medium,
    },
    {
      label: "LOW",
      value: data.low,
    },
  ];



  return (

    <div className="rounded-xl bg-white p-6 shadow">


      <h2 className="mb-6 text-xl font-bold">
        Priority
      </h2>



      <div className="space-y-5">


        {priorities.map((priority) => (


          <div
            key={priority.label}
          >


            <div className="mb-2 flex justify-between">


              <span className="font-medium text-gray-700">
                {priority.label}
              </span>


              <span className="text-gray-500">
                {priority.value}
              </span>


            </div>



            <div className="h-3 rounded-full bg-gray-200">


              <div

                className="h-3 rounded-full bg-purple-600 transition-all"

                style={{
                  width:
                    `${
                      priority.value * 20
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