import CardJobs from "@/components/card-jobs";
import { SAVED_JOBS, APPLIED_JOBS } from "@/services/jobService";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Typography } from "@material-tailwind/react";
import { AppDispatch, RootState } from "@/redux/store";
import JobCard from "@/components/jobs/job-card";
import { useEffect, useState } from "react";
import { getAppliedJobs } from "@/redux/features/job/jobSlice";
interface Job {
  id: string;
  title: string;
  workcontent: string; // Changed from string[] to string
  musicculture: string;
  descriptionjob: string;
  imgSong: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName: string;
  musicStyle: string;
  tags: string[];
  username: string;
  fotoprofile: string;
  category: string[];
  musicUse: string[];
  cultureArea: string[];
  lyricLanguage: string;
  budget: string[];
  timeFrame: string;
  applicantName: string;
  createdAt: string;
  savedBy: string[];
}

export function SavedJobs() {

  const dispatch = useDispatch<AppDispatch>();
  const Applied_Jobs = useSelector((state: RootState) => state.job.appliedJobs);
  const fireGetJob = useSelector((state: any) => state.job.fireGetJob);

  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem('auth');
    setAuth(userString ? JSON.parse(userString) : null);
    dispatch(getAppliedJobs())

  }, [fireGetJob]);

  const allJobs = useSelector((state: RootState) => state.job.data);

  const savedJobs = allJobs?.jobs.filter((job: any) => job.savedBy.includes(auth?.user?.id));

  const appliedJobIds = Applied_Jobs ? Applied_Jobs.map((job: any) => job.id) : [];

  const onlySavedJobs = savedJobs ? savedJobs.filter((job: any) => !appliedJobIds.includes(job.id)) : []


  // console.log(savedJobs, "saved jobs");

  return (
    <>
      <section className="grid min-h-screen">
        <div className="py-4 flex justify-items-start items-start sm:justify-start">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <Typography variant="h5" className="font-bold" color="black">
              Saved Jobs
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {(!savedJobs == undefined) || allJobs ? onlySavedJobs.map((props: any, key: number) => (
                <JobCard key={key} {...props} />
              )) : (auth?.user.role !== 'recruiter' ? <Spinner className="w-12 h-12" /> : <div>This feature is for musician only.</div>)
              }
            </div>
            <div className="pt-[4rem]"></div>
            <Typography variant="h5" className="font-bold" color="black">
              My Application
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {Applied_Jobs ? Applied_Jobs.map((props: any, key: number) => (
                <JobCard key={key} {...props} />
              )) : <Spinner className="w-12 h-12" />
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SavedJobs;
