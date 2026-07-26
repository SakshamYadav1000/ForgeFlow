import { useState } from "react";

import type { Project } from "../../types/project";

interface Props {
  project: Project;

  // update projects
  onUpdate: (
    name: string,
    description: string
  ) => Promise<void>;
}


export default function EditProjectModal({
  project,
  onUpdate,
}: Props) {


  const [name, setName] =
    useState(project.name);


  const [description, setDescription] =
    useState(
      project.description ?? ""
    );


  const [loading, setLoading] =
    useState(false);



  const handleSubmit = async () => {

    try {

      setLoading(true);


      await onUpdate(
        name,
        description
      );


    } catch(error){

      console.error(error);


    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-4 text-xl font-semibold">
        Edit Project
      </h2>



      {/* Project Name */}
      <input

        className="mb-3 w-full rounded border p-3"

        value={name}

        onChange={(e)=>
          setName(e.target.value)
        }

        placeholder="Project Name"

      />



      {/* Project Description */}
      <textarea

        className="mb-4 w-full rounded border p-3"

        value={description}

        onChange={(e)=>
          setDescription(
            e.target.value
          )
        }

        placeholder="Project Description"

      />



      <button

        onClick={handleSubmit}

        disabled={loading}

        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"

      >

        {
          loading
          ? "Updating..."
          : "Update Project"
        }


      </button>


    </div>

  );

}