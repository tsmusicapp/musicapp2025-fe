import CardJobs from "@/components/card-jobs";
import { ACTIVE_JOBS, INACTIVE_JOBS } from "@/dummy/example";
import { Typography, Button, Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, getMyJobs } from "@/redux/features/job/jobSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/redux/store";
import JobsCard from "@/components/jobs/job-card";
interface Job {
  applicantName: string;
  applicantAvatar: string | null;
  applicantBackgroundImage: string | null;
  applicantSelectedSongs: string[] | null;
  status : string;
  budget: string[];
  category: string[];
  createdAt: string;
  createdBy: string;
  cultureArea: string[];
  description: string;
  isHaveLyric: boolean;
  id: string;
  lyricLanguage: string;
  musicUse: string[];
  preferredLocation: string;
  projectTitle: string;
  timeFrame: string;
  savedBy: string[];// const activeJobs = data != null ? data.filter((job:Job)=> job.status === "active"):[];
  // const inactiveJobs = data != null ? data.filter((job:Job)=> job.status === "inactive"):[];

}
export function MyProjects() {
  const dispatch = useDispatch<AppDispatch>();
  const {data} = useSelector((state:any) => state.job);
  console.log(data , "data for my projects")
  const fireGetJob // const activeJobs = data != null ? data.filter((job:Job)=> job.status === "active"):[];
  // const inactiveJobs = data != null ? data.filter((job:Job)=> job.status === "inactive"):[];
= useSelector((state:any) => state.job.fireGetJob);
  // const activeJobs = data != null ? data.filter((job:Job)=> job.status === "active"):[];
  // const inactiveJobs = data != null ? data.filter((job:Job)=> job.status === "inactive"):[];


  // console.log(activeJobs , "active")

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch , fireGetJob ]);

  // console.log(data, "my jobs");
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;


  return (
    <>
      <section className="grid min-h-screen">
        <div className="py-4 flex justify-items-start items-start sm:justify-start">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <Button
              className="w-[11rem] py-2 normal-case text-sm text-black bg-blue-200 border-2 border-black"
              fullWidth
            >
              Post New Project
            </Button>
            <Typography variant="h5" className="font-bold" color="black">
              Active
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {data ? data.jobs.map((props : Job, index:number) => (
                props.status === "active" && <JobsCard key={props.id || index} {...props} />
              )) : <div>
                    <Spinner className="h-12 w-12"/>
                  </div>
              }
            </div>
            <div className="pt-[4rem]"></div>
            <Typography variant="h5" className="font-bold" color="black">
              Inactive
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {data ? data.jobs.map((props : Job, index:number) => (
                props.status != "active" && <JobsCard key={props.id || index} {...props} />
              )) : <div>
                    <Spinner className="h-12 w-12"/>
                  </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyProjects;
