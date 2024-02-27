"use client";
import { SideBarMain } from "@/components/sidebar";
import CreateUpsell from "./createUpsells";
import { useRouter } from "next/router";
import EditUpsell from "./editUpsells";
import { request } from "http";
import { useSearchParams } from "next/navigation";

//This is client component
//Component

const CreateUpsellPage = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("upsell_id"));
  const upsell_id = searchParams.get("upsell_id");
  // const { upsell_id } = router.query || {};

  return (
    <SideBarMain>
      <div className="flex bg-gray-100">
        {searchParams.has("upsell_id") ? <EditUpsell /> : <CreateUpsell />}
      </div>
    </SideBarMain>
  );
};
export default CreateUpsellPage;
