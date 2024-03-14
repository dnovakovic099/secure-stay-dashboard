"use client";
import SideBarMain from "@/components/sidebar";

import { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { TrashIcon, LinkIcon, XCircleIcon } from "@heroicons/react/20/solid";
import CommonPopup from "@/components/commonPopup";
import { Card } from "./createupsells/cardComponent";
import { envConfig } from "@/utility/environment";
import toast from "react-hot-toast";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import CommonDialog from "@/components/commonDailogBox";
import UpsellDashboard, { Upsell } from "./upsellView/upselldashboard";
import { NavbarProvider } from "./upsellView/navbarContent";
import axiosInstance from "@/auth/axiosInstance";

const Upsells = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [totalData, setTotalData] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(totalData / limit);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [upsells, setUpsells] = useState<Upsell[]>([]);
  const [title, setTitle] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const sampleImageUrl =
    "https://placehold.co/200x400/?text=Build+your%0Aown+upsells";

  const sampleTitle = "Start from Blank";
  const sampleDescription = "Lorem ipsum ";

  const data: any[] = [
    // { imageUrl: 'https://placekitten.com/300/200', title: 'Card 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: Math.random() * 100 },
    // { imageUrl: 'https://placehouse.com/300/200', title: 'Card 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', price: Math.random() * 100 },
  ];

  useEffect(() => {
    fetchData(currentPage, limit, title);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    // fetchData(currentPage, limit, title);
  }, [limit, title]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchData(1, limit, title);
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [title]);

  useEffect(() => {
    if (totalData > 10) {
      setTotalPages(Math.ceil(totalData / limit));
    } else {
      setTotalPages(1);
    }
  }, [totalData, limit]);

  const fetchData = async (
    currentPage: number,
    limit: number,
    title: string
  ) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell/upsellList?page=${currentPage}&limit=${limit}&title=${title}`; // Replace with your API endpoint
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      // setIsLoading(true);
      const result: any = await handleApiCallFetch(apiUrl, params);

      setUpsells(result.data);
      setTotalData(result.length);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handleCardClick = (item: any) => {
    router.push("/upsells/createupsells?template_id=${item.title}", item);
  };

  const handleCreateUpsell = () => {
    router.push("/upsells/createupsells");
  };

  const handleRequest = async (method: string, uri: string, data?: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/${uri}`;

      const response = await axiosInstance({
        method,
        url: apiUrl,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle the successful response here
      fetchData(currentPage, limit, title);
      setSelectAll(false);
      setSelectedRows([]);
    } catch (error: any) {
      toast.error(error.message);
      // Handle errors here
      console.error("Error making request:", error.message);
    }
  };

  const handleDialogAction = () => {
    if (dialogAction) {
      dialogAction();
      setDialogOpen(false);
      setDialogAction(null);
      setDialogMessage("");
    }
  };

  const openDialog = (action: () => void, message: string) => {
    setDialogAction(() => action);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedRows.length === 0 || selectedRows === null) {
      toast.error("Please select upsells");
      return;
    }

    openDialog(
      () =>
        handleRequest("POST", `upsell/delete-multiple`, {
          upSellIds: selectedRows,
        }),
      "Are you sure you want to delete all selected upsells?"
    );
  };

  const handleActivate = () => {
    if (selectedRows.length === 0 || selectedRows === null) {
      toast.error("Please select upsells");
      return;
    }

    openDialog(
      () =>
        handleRequest("PUT", "upsell/update-multiple-status", {
          upSellId: selectedRows,
          status: 1,
        }),
      "Are you sure you want to activate all selected upsells?"
    );
  };

  const handleDeactivate = () => {
    if (selectedRows.length === 0 || selectedRows === null) {
      toast.error("Please select upsells");
      return;
    }

    openDialog(
      () =>
        handleRequest("PUT", "upsell/update-multiple-status", {
          upSellId: selectedRows,
          status: 0,
        }),
      "Are you sure you want to deactivate all selected upsells?"
    );
  };

  const solutions = [
    {
      name: "Delete Upsell",
      icon: TrashIcon,
      onclick: handleDelete,
    },
    {
      name: "Activate Upsell",
      icon: LinkIcon,
      onclick: handleActivate,
    },
    {
      name: "Deactivate Upsell",
      icon: XCircleIcon,
      onclick: handleDeactivate,
    },
  ];

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allRows = upsells.map((upsell, index) => upsell.upSellId);
    setSelectedRows(selectAll ? [] : allRows);
  };

  const handleToggle = (index: number) => {
    let upsellStatus: any;
    const updatedUpsells = [...upsells];
    updatedUpsells.map((upsell, i) => {
      if (upsell.upSellId === index) {
        upsellStatus = !upsell.status;
      }
    });

    openDialog(
      () =>
        handleRequest("PUT", "upsell/update-multiple-status", {
          upSellId: [index],
          status: upsellStatus,
        }),
      upsellStatus
        ? "Are you sure you want to enable this Upsell for all rentals?"
        : "Are you sure you want to disable this Upsell for all rentals?"
    );
  };

  const handleRowCheckboxChange = (index: number) => {
    const newSelectedRows = [...selectedRows];
    const selectedIndex = newSelectedRows.indexOf(index);

    if (selectedIndex !== -1) {
      newSelectedRows.splice(selectedIndex, 1);
    } else {
      newSelectedRows.push(index);
    }

    setSelectedRows(newSelectedRows);
  };

  return (
    <SideBarMain
      NavbarContent={
        <NavbarProvider
          limit={limit}
          onLimitChange={setLimit}
          actionItems={solutions}
          handleOpenPopup={handleOpenPopup}
          title={title}
          setTitle={setTitle}
        />
      }
    >
      <div className="flex items-start justify-center bg-gray-100 h-[100%] top-0">
        <div className="min-w-full m ">
          <UpsellDashboard
            upsells={upsells}
            setUpsells={setUpsells}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            handleRowCheckboxChange={handleRowCheckboxChange}
            handleToggle={handleToggle}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            totalData={totalData}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />

          <CommonDialog
            isOpen={isDialogOpen}
            onClose={() => {
              setDialogOpen(false);
              setDialogAction(null);
              setDialogMessage("");
            }}
            onYes={handleDialogAction}
            message={dialogMessage}
          />
          <CommonPopup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            title="Create Upsell"
            disableCloseIcon={false}
            heightwidth="max-w-[100%] max-h-[100%]"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-1">
              <div key={0} onClick={() => handleCreateUpsell()}>
                <Card
                  imageUrl={sampleImageUrl}
                  title={sampleTitle}
                  description={sampleDescription}
                />
              </div>

              {data.map((item, index) => (
                <div key={index} onClick={() => handleCardClick(item)}>
                  <Card {...item} />
                </div>
              ))}
            </div>
          </CommonPopup>
        </div>
      </div>
    </SideBarMain>
  );
};

export default Upsells;
