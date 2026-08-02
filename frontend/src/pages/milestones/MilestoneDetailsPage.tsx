import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";


import MainLayout from "../../layouts/MainLayout";


import EditMilestoneModal from "../../components/milestones/EditMilestoneModal";


import {
    getMilestone,
    updateMilestone,
    deleteMilestone,
} from "../../services/milestoneService";


import type {
    Milestone,
    UpdateMilestoneRequest,
} from "../../types/milestone";



export default function MilestoneDetailsPage() {


    const { milestoneId } =
        useParams();


    const navigate =
        useNavigate();



    const [milestone, setMilestone] =
        useState<Milestone | null>(null);



    const [loading, setLoading] =
        useState(true);



    const [saving, setSaving] =
        useState(false);



    const [showEditModal, setShowEditModal] =
        useState(false);





    // Fetch milestone details
    const fetchMilestone = async () => {


        if (!milestoneId) return;



        try {


            const data =
                await getMilestone(
                    Number(milestoneId)
                );



            setMilestone(data);



        } catch (error) {


            console.error(error);



        } finally {


            setLoading(false);


        }


    };




    useEffect(() => {

        fetchMilestone();

    }, [milestoneId]);







    // Update milestone
    const handleUpdate = async (
        data: UpdateMilestoneRequest
    ) => {


        if (!milestoneId) return;



        try {


            setSaving(true);



            await updateMilestone(
                Number(milestoneId),
                data
            );



            await fetchMilestone();



            setShowEditModal(false);



            alert(
                "Milestone updated successfully."
            );



        } catch (error) {


            console.error(error);



            alert(
                "Failed to update milestone."
            );



        } finally {


            setSaving(false);


        }


    };








    // Delete milestone
    const handleDelete = async () => {


        if (!milestone) return;



        const confirmed =
            window.confirm(
                "Are you sure you want to delete this milestone?"
            );



        if (!confirmed) return;



        try {


            await deleteMilestone(
                milestone.id
            );



            alert(
                "Milestone deleted successfully."
            );



            navigate(-1);



        } catch (error) {


            console.error(error);



            alert(
                "Failed to delete milestone."
            );


        }


    };








    return (

        <MainLayout>


            {loading ? (

                <p>
                    Loading...
                </p>



            ) : !milestone ? (


                <p>
                    Milestone not found.
                </p>



            ) : (


                <>


                    {/* Header */}

                    <div className="mb-8 flex items-center justify-between">


                        <h1 className="text-3xl font-bold">
                            Milestone Details
                        </h1>



                        <div className="flex gap-3">


                            <button

                                onClick={() =>
                                    setShowEditModal(true)
                                }

                                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"

                            >

                                Edit Milestone

                            </button>




                            <button

                                onClick={handleDelete}

                                className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"

                            >

                                Delete Milestone

                            </button>



                        </div>


                    </div>






                    {/* Milestone Information */}

                    <div className="rounded-xl bg-white p-8 shadow">


                        <h2 className="text-2xl font-bold">

                            {milestone.title}

                        </h2>




                        <p className="mt-4 text-gray-600">

                            {milestone.description ||
                                "No description"}

                        </p>





                        <div className="mt-8 grid grid-cols-2 gap-6">



                            <div>

                                <h3 className="text-sm text-gray-500">
                                    Status
                                </h3>

                                <p className="font-semibold">
                                    {milestone.status}
                                </p>

                            </div>





                            <div>

                                <h3 className="text-sm text-gray-500">
                                    Project ID
                                </h3>

                                <p>
                                    {milestone.project_id}
                                </p>

                            </div>





                            <div>

                                <h3 className="text-sm text-gray-500">
                                    Due Date
                                </h3>

                                <p>

                                    {milestone.due_date
                                        ? new Date(
                                            milestone.due_date
                                        ).toLocaleString()

                                        : "No due date"}

                                </p>

                            </div>





                            <div>

                                <h3 className="text-sm text-gray-500">
                                    Created
                                </h3>

                                <p>

                                    {new Date(
                                        milestone.created_at
                                    ).toLocaleString()}

                                </p>

                            </div>






                            <div>

                                <h3 className="text-sm text-gray-500">
                                    Updated
                                </h3>

                                <p>

                                    {new Date(
                                        milestone.updated_at
                                    ).toLocaleString()}

                                </p>

                            </div>




                        </div>


                    </div>






                    <EditMilestoneModal

                        open={
                            showEditModal
                        }

                        milestone={
                            milestone
                        }

                        loading={
                            saving
                        }

                        onClose={() =>
                            setShowEditModal(false)
                        }

                        onSave={
                            handleUpdate
                        }

                    />



                </>


            )}



        </MainLayout>

    );

}