import type { IssueDependency } from "../../types/issueDependency";


interface DependencyCardProps {

  dependency: IssueDependency;

  onDelete: (
    dependencyId: number
  ) => void;

}


export default function DependencyCard({
  dependency,
  onDelete,
}: DependencyCardProps) {


  return (

    <div className="rounded-lg bg-white p-5 shadow">


      <div className="flex items-center justify-between">


        <div>

          <p className="font-semibold">

            Issue #{dependency.source_issue_id}

            {" "}

            {dependency.dependency_type}

            {" "}

            Issue #{dependency.target_issue_id}

          </p>


          <p className="mt-2 text-sm text-gray-500">

            Created:

            {" "}

            {new Date(
              dependency.created_at
            ).toLocaleString()}

          </p>

        </div>



        <button

          onClick={() =>
            onDelete(
              dependency.id
            )
          }

          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"

        >

          Remove

        </button>


      </div>


    </div>

  );

}