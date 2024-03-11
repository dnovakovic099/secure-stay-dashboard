"use client";
import CreateUpsell from "./createUpsells";
import { useRouter } from "next/router";
import EditUpsell from "./editUpsells";
import { request } from "http";
import { useSearchParams } from "next/navigation";
import SideBarMain from "@/components/sidebar";

const CreateUpsellPage = () => {
  const searchParams = useSearchParams();
  const upsell_id = searchParams.get("upsell_id");
  // const { upsell_id } = router.query || {};

  return (
    <SideBarMain>
      <div>
        {searchParams.has("upsell_id") ? <EditUpsell /> : <CreateUpsell />}
      </div>
    </SideBarMain>
  );
};
export default CreateUpsellPage;
