interface StatCardProps {

  title: string;

  value: number;

  icon?: React.ReactNode;

}



export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {


  return (

    <div className="rounded-xl bg-white p-6 shadow hover:shadow-md transition">


      <div className="flex items-center justify-between">


        <div>


          <p className="text-sm text-gray-500">
            {title}
          </p>


          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>


        </div>



        {icon && (

          <div className="text-3xl text-blue-600">

            {icon}

          </div>

        )}


      </div>


    </div>

  );

}