"use client";
import CreativeHire from "@/app/jobs/creative-hire";
import Freelance from "@/app/jobs/freelance";
import MyProjects from "@/app/jobs/my-projects";
import SavedJobs from "@/app/jobs/saved-jobs";
import { isAuthenticated } from "@/checkAuth";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

interface TabItem {
  label: string;
  value: string;
  desc: JSX.Element;
}

export function JobsPage() {
  const { data: jobData, loading, error } = useSelector((state: any) => state.job);
  const auth = isAuthenticated();

  const activeJobs = jobData?.jobs?.filter((job: any) => job.status === "active") || [];

  const allTabs: TabItem[] = [
    {
      label: `Freelance (${activeJobs.length})`,
      value: "freelance",
      desc: <Freelance />,
    },
    {
      label: "Creative for Hire",
      value: "creative",
      desc: <CreativeHire />,
    },
    {
      label: "Saved Jobs",
      value: "saved",
      desc: <SavedJobs />,
    },
    {
      label: "My Project(Post Job) (1)",
      value: "jobs",
      desc: <MyProjects />,
    },
  ];

  const data = auth
    ? allTabs
    : allTabs.filter((tab) => tab.value === "freelance");

  return (
    <section className="flex justify-center min-h-screen p-4">
      <Tabs
        id="custom-animation"
        value="freelance"
        className="mx-2 max-w-7xl w-full mb-16"
      >
        {/* Only show TabsHeader if authenticated */}
        {auth && (
          <TabsHeader className="h-10 border border-white/25 bg-opacity-90 flex w-full">
            {data.map((tab: TabItem) => (
              <Tab key={tab.value} value={tab.value} className="flex-1 text-center">
                {tab.label}
              </Tab>
            ))}
          </TabsHeader>
        )}

        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="p-0 pt-4">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </section>
  );
}

export default JobsPage;
