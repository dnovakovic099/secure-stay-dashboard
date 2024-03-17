"use client";
import SideBarMain from "@/components/sidebar";
import CreateUpsell from "./createUpsells";

import EditUpsell from "./editUpsells";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { envConfig } from "@/utility/environment";
import { useEffect, useState } from "react";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/20/solid";
import { CreateUpsellNavbarProvider } from "./navbarContent";
import CommonDialog from "@/components/commonDailogBox";
import axiosInstance from "@/auth/axiosInstance";

export interface Property {
  listingId: number;
  id: number;
  name: string;
  externalListingName: string;
  address: string;
  price: number;
  guestsIncluded: number;
  priceForExtraPerson: number;
  currencyCode: string;
  status: number;
}

const CreateUpsellPage = () => {
  const searchParams = useSearchParams();
  const upsell_id = searchParams.get("upsell_id");
  const emptyProperties: Property[] = [];
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState("");
  const [attachedProperties, setAttachedProperties] = useState(emptyProperties);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const template_id = searchParams.get("template_id");
  const [templateImageUrl, seTemplateImageUrl] = useState("");

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogMessage, setDialogMessage] = useState("");

  const goBack = () => {
    router.push("/upsells");
  };

  useEffect(() => {
    if (template_id) {
      fetchData(template_id);
      fetchListingData();
    }
  }, [template_id]);

  useEffect(() => {
    if (upsell_id) {
      fetchData(upsell_id);
      fetchListingData();
    }
  }, [upsell_id]);

  useEffect(() => {
    fetchListingData();
  }, []);

  const fetchData = async (id: string) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell?upSellId=${id}`;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      setIsLoading(true);
      const result: any = await handleApiCallFetch(apiUrl, params);

      const responseData = result.data;

      setTitle(responseData.title);
      setShortDescription(responseData.description);
      setPrice(responseData.price);
      seTemplateImageUrl(responseData.image);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error occured");
      // Handle error
    }
  };

  const handlePostRequest = async (postData: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell/create`;

      const response = await axiosInstance.post(apiUrl, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response here
      if (response.status === 200) {
        setTitle("");
        setShortDescription("");
        setPrice("");
        setAttachedProperties(emptyProperties);
        setSelectedImage(null);
        goBack();
        return;
      }
      toast.error(`${response.data.message}`);
      return;
    } catch (error: any) {
      toast.error(`${error.message}`);
      // Handle the error here
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter title");
      return;
    }

    if (price === "") {
      toast.error("Please enter price");
      return;
    }

    const formData = new FormData();
    if (selectedImage) formData.append("photo", selectedImage!);
    if (templateImageUrl) formData.append("image", templateImageUrl);
    formData.append("title", title);
    formData.append("description", shortDescription);
    formData.append("price", price);
    attachedProperties.forEach((property, index) => {
      if (property.status == 1) {
        formData.append(`listingIds[${index}]`, property.listingId.toString());
      }
    });
    handlePostRequest(formData);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file && file.size <= 2048 * 1024) {
      setSelectedImage(file);
    } else {
      alert(
        "Please choose an image with a size equal to or less than 2048 KB."
      );

      e.target.value = null;
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 2048 * 1024) {
      setSelectedImage(file);
    } else {
      alert(
        "Please choose an image with a size equal to or less than 2048 KB."
      );
    }
  };

  const fetchListingData = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/listing/getlistings`;
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const result: any = await handleApiCallFetch(apiUrl, params);

      // Handle successful data fetch
      console.log(result);

      setAttachedProperties(
        result.listings?.map((property: any) => ({ ...property, status: 0 }))
      );
      {
        upsell_id && fetchAssociatedListing(upsell_id);
        template_id && fetchAssociatedListing(template_id);
      }
    } catch (error) {
      toast.error("Error occured");
      // Handle error
    }
  };

  const handleRequest = async (method: string, uri: string, data?: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/${uri}`;

      setIsLoading(true);
      const response = await axiosInstance({
        method,
        url: apiUrl,
        data,
        headers: {
          "Content-Type": "application/form-data",
        },
      });

      setIsLoading(false);
      goBack();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      // Handle errors here
      console.error("Error making request:", error.message);
    }
  };

  const handleDelete = () => {
    openDialog(
      () => handleRequest("DELETE", `upsell/delete?upSellId=${upsell_id}`, {}),
      "Are you sure you want to delete upsells?"
    );
  };

  const solutions = [
    {
      name: "Delete",
      icon: TrashIcon,
      onclick: handleDelete,
    },
  ];

  const handleUpdateRequest = async (postData: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell/update`;
      setIsLoading(true);
      const response = await axiosInstance.put(apiUrl, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response here
      if (response.status === 200) {
        setIsLoading(false);
        goBack();
        return;
      }
      setIsLoading(false);
      toast.error(`${response.data.message}`);
      return;
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`${error.message}`);
      // Handle the error here
      console.error(error);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    selectedImage && formData.append("photo", selectedImage!);
    formData.append("upSellId", upsell_id!);
    formData.append("title", title);
    formData.append("description", shortDescription);
    formData.append("price", price);

    attachedProperties.forEach((property, index) => {
      if (property.status == 1) {
        formData.append(`listingIds[${index}]`, property.listingId.toString());
      }
    });
    handleUpdateRequest(formData);
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

  const fetchAssociatedListing = async (id: string) => {
    const apiUrl = `${envConfig.backendUrl}/upsell/listing?upSellId=${id}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result: any = await handleApiCallFetch(apiUrl, params);

    setAttachedProperties((prevProperties) =>
      prevProperties?.map((property) => {
        const updatedProperty = result.data?.find(
          (item: any) => item.id === property.id
        );
        return updatedProperty
          ? { ...property, status: 1 }
          : { ...property, status: 0 };
      })
    );
  };

  return (
    <SideBarMain
      NavbarContent={
        <CreateUpsellNavbarProvider
          upsell_id={upsell_id!}
          actionItems={solutions}
          handleSubmit={handleSubmit}
          handleUpdate={handleUpdate}
          goBack={goBack}
        />
      }
      isHideSidebar={true}
    >
      <div className="flex">
        {searchParams.has("upsell_id") ? (
          <EditUpsell
            upsell_id={upsell_id!}
            title={title}
            shortDescription={shortDescription}
            price={price}
            attachedProperties={attachedProperties}
            selectedImage={selectedImage}
            templateImageUrl={templateImageUrl}
            isLoading={isLoading}
            setTitle={setTitle}
            setShortDescription={setShortDescription}
            setPrice={setPrice}
            setAttachedProperties={setAttachedProperties}
            setSelectedImage={setSelectedImage}
            setIsLoading={setIsLoading}
            goBack={goBack}
            handleImageUpload={handleImageUpload}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            fetchListingData={fetchListingData}
          />
        ) : (
          <CreateUpsell
            title={title}
            shortDescription={shortDescription}
            price={price}
            attachedProperties={attachedProperties}
            selectedImage={selectedImage}
            templateImageUrl={templateImageUrl}
            isLoading={isLoading}
            setTitle={setTitle}
            setShortDescription={setShortDescription}
            setPrice={setPrice}
            setAttachedProperties={setAttachedProperties}
            setSelectedImage={setSelectedImage}
            seTemplateImageUrl={seTemplateImageUrl}
            setIsLoading={setIsLoading}
            goBack={goBack}
            handleImageUpload={handleImageUpload}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            fetchListingData={fetchListingData}
          />
        )}
      </div>
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
    </SideBarMain>
  );
};
export default CreateUpsellPage;
