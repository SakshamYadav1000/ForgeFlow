import { useState } from "react";

import type { Issue } from "../../types/issue";

import type {
  DependencyType,
} from "../../types/issueDependency";


interface CreateDependencyModalProps {

  issues: Issue[];

  loading: boolean;

  onCreate: (
    targetIssueId: number,
    dependencyType: DependencyType
  ) => Promise<void>;

}



export default function CreateDependencyModal({

  issues,

  onCreate,

}: CreateDependencyModalProps) {


  const [targetIssueId, setTargetIssueId] =
    useState<number | "">("");

  const [type, setType] =
    useState<DependencyType>(
      "BLOCKS"
    );


  const handleSubmit = async () => {


    if (!targetIssueId) return;


    await onCreate(
      Number(targetIssueId),
      type
    );


    setTargetIssueId("");

  };



  return (

    <div className="rounded-lg bg-white p-5 shadow">


      <h2 className="mb-4 text-xl font-semibold">

        Add Dependency

      </h2>



      <select

        value={targetIssueId}

        onChange={(e) =>
          setTargetIssueId(
            Number(e.target.value)
          )
        }

        className="w-full rounded border p-2"

      >

        <option value="">

          Select Issue

        </option>


        {
          issues.map(issue => (

            <option
              key={issue.id}
              value={issue.id}
            >

              #{issue.id} - {issue.title}

            </option>

          ))
        }


      </select>



      <select

        value={type}

        onChange={(e) =>
          setType(
            e.target.value as DependencyType
          )
        }

        className="mt-3 w-full rounded border p-2"

      >

        <option value="BLOCKS">
          Blocks
        </option>

        <option value="RELATED">
          Related
        </option>

        <option value="DUPLICATE">
          Duplicate
        </option>


      </select>



      <button

        onClick={handleSubmit}

        className="mt-4 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"

      >

        Add Dependency

      </button>


    </div>

  );

}