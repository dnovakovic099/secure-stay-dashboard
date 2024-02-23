import React, { useState } from "react";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  LockClosedIcon,
  MapIcon,
  MapPinIcon,
  PhotoIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import CommonTabs from "@/components/commonTabs";
import Image from "next/image";
import GeneralInfo from "../listing/tabs/generalInfo";
import Address from "../listing/tabs/address";
import CheckInandOut from "../listing/tabs/check-in-out";
import GuideBook from "../listing/tabs/guideBook";
import Policies from "../listing/tabs/policies";
import Picture from "../listing/tabs/picture";
import Device from "../listing/tabs/device";
import Fees from "./userInfoTab/fees";
import Upsells from "./userInfoTab/upsells";
import Aiknowledge from "./userInfoTab/aiknowledge";
import HotelPicture from "./userInfoTab/hotelPicture";

const tabs: any[] = [
  { id: 1, name: "Listing Information", href: "#", current: false },
  { id: 2, name: "Automated Message", href: "#", current: false },
];

const sampleJson: any = {
  listingId: 1,
  id: 169539,
  name: "Ultimate Beach Getaway · Mins from Beach · Hot Tub · Heated Pool · Game Room",
  externalListingName:
    "Ultimate Beach Getaway · Mins from Beach · Hot Tub · Heated Pool · Game Room",
  address: "13348 92nd Ave N, Seminole, FL 33776, USA",
  price: 494,
  guestsIncluded: 1,
  priceForExtraPerson: 0,
  currencyCode: "USD",
  images: [
    {
      id: 532,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-1CUKEAl6eywqwJNq0L9o2y813sdJ--p5bbIsY9r---anI-646fd2a7142ea",
      sortOrder: 1,
    },
    {
      id: 533,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-lzCXkeI76wqL5McatgYzD-nk5ffrn8-fb23YUfvx1M8-646fd2a95bdee",
      sortOrder: 2,
    },
    {
      id: 534,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-UUCN3wvb59oQpeI0CU0uYJgv-TgRc9P-MvRwhIO8EPA-646fd2acbbf77",
      sortOrder: 3,
    },
    {
      id: 535,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-s7sqcahi7cH4AGz69niETJACAKQgcoCn6wEJxIYvZGY-646fd2b10044c",
      sortOrder: 4,
    },
    {
      id: 536,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-cMD5AD9F9S28zMyj-56mz5XFhbRceugDoHjuoAeF7Y4-646fe80c7737a",
      sortOrder: 5,
    },
    {
      id: 537,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-MEvhdSY7bWHPFa2g0OayJ2Ihiu17KjYPjVVxgirvsRU-646fe80eafe3b",
      sortOrder: 6,
    },
    {
      id: 538,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-UQj2mePnWLZJutvi8f-NQuFGShz6utkMREAZS--EqZ--g-646fe81130437",
      sortOrder: 7,
    },
    {
      id: 539,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-1JIxHxh0QMwd0IqrZMOq06Iiby7YuHPU395JorO2xa4-646fe8136d60a",
      sortOrder: 8,
    },
    {
      id: 540,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-3DnyIHdhaU40AF9-wD7P-ylOXWU--k-wrtYDTuOr7fpY-646fd2c1c7c8b",
      sortOrder: 9,
    },
    {
      id: 541,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-rmojhFWEqfefAs9DEtlmSDzTZXhGS8uYjoJZGwaUlz4-646fd2c5c552a",
      sortOrder: 10,
    },
    {
      id: 542,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-v8FPP414Q8L0RLsHcvH0RoHRUccrcpOOBQ4Oxh89-Bo-646fe81566ce2",
      sortOrder: 11,
    },
    {
      id: 543,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-bRZKTNO4fRe8egW-IEf--DbwGE7RtCm4Fy7YQ8sAmLgU-646fd2cae6040",
      sortOrder: 12,
    },
    {
      id: 544,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-s6-fY2JyLFFqA7coYzfpfhKUKpolzxR-VG-t7W--sVjU-647003c9e5fe6",
      sortOrder: 13,
    },
    {
      id: 545,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-2VkrU9kHhyg8Ei1Vi6cQ5jSIpt--yplM0FaBORv0RB2Y-646fd2d0c64a7",
      sortOrder: 14,
    },
    {
      id: 546,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-o-7ZYTr--d0Y3Lco9Ixf0sG5zwC7Hg4024qr48zEkGTg-646fd2d45ae18",
      sortOrder: 15,
    },
    {
      id: 547,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-8PY--CpUnTCm7cj--yVDGp8SEEfGz37I5wbs6vfOQxjts-646fd2d826b81",
      sortOrder: 16,
    },
    {
      id: 548,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-n5Qmi8Huu3wVaoOO550VzLpO4WYujqhpubNxIhgym6g-646fe818cd404",
      sortOrder: 17,
    },
    {
      id: 549,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-o1ZjgKPrsjLm0oHstgpm8Z4AyhPz1-mSk-McOhbIYlI-646fd2dda8f82",
      sortOrder: 18,
    },
    {
      id: 550,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-qde6Oz3vYq8--urhVlsEplZGyblXeVoYj5yOc90gSDhc-646fd2e1747b6",
      sortOrder: 19,
    },
    {
      id: 551,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-di--s--fzVq0IMcvpzuKp6xqHOiQ3FTxaYtIZbycqEe3A-646fd2e4f213d",
      sortOrder: 20,
    },
    {
      id: 552,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-7dSmnnly4DM-TS2--WR-mqL-GYprgUjFqcDo27hdV2Gc-646fd2e81ffdf",
      sortOrder: 21,
    },
    {
      id: 553,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-yMfGeEeyqQQArxvrlZ356HsCtrH7gS3aXToGSzhZQNQ-647003cbc2ab2",
      sortOrder: 22,
    },
    {
      id: 554,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-fc4AcOx1jgNaYwVr9Idh2hnjDPyfooqyMZlSkImF-Cw-647003cdc21ba",
      sortOrder: 23,
    },
    {
      id: 555,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-8sLcWshIZz0mPDv9SWhtUawSXH9fhPOQdAXEFlh9OB0-646fe81e334db",
      sortOrder: 24,
    },
    {
      id: 556,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-XWYUMFgmaohnNC53C7snIqUwbJFhNAECR0btITP8fQc-646fd2f281ecb",
      sortOrder: 25,
    },
    {
      id: 557,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-9rLygCGR6PjMvsnUNFLCeyzUZMfdx-8aniODFU1yE8o-646fd2f730a85",
      sortOrder: 26,
    },
    {
      id: 558,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-Xnj7n2G0an-ZtCIBMpFaR8qJfaT--8TAEvMwkLcnMYaw-646fe820551bd",
      sortOrder: 27,
    },
    {
      id: 559,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-Tms9kv9W14SaCYrPRQSdfHUdoC7zr6g2ONQKCw2iBNc-646fd2fe0f162",
      sortOrder: 28,
    },
    {
      id: 560,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-i67Nwq2k--PvCIEBl23EVdc3AJiOJ0nLGFBL6JBo7jj4-646fd301dc8db",
      sortOrder: 29,
    },
    {
      id: 561,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-kvDm90mqJLNGY19HFd8UfBlpr1f1V5YGJmhxz8HwrRY-646fd3054bd53",
      sortOrder: 30,
    },
    {
      id: 562,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-T--OHiISmLRUmFdhA8iEFZMsIV0qhEQdocr5hh--Ss9eA-647003d00ec8e",
      sortOrder: 31,
    },
    {
      id: 563,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-FkB8ObcIuQNXVApHpeWX9K0irmJ-Vx9WWZ4D3MRkjNA-647003d20b22f",
      sortOrder: 32,
    },
    {
      id: 564,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-UI62ZnFLe5fW3EvPM502EEMQfhNm5gfzxIthz39Aio4-646fe8251e995",
      sortOrder: 33,
    },
    {
      id: 565,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-zJjMoWaVoX9h80w0wmzXhsurVlSmnQMf4--4M9zch3RM-646fe82790caa",
      sortOrder: 34,
    },
    {
      id: 566,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-caT--CPRfYgEHmuEb91DDqFQwlylc9lUHnyV44pArU4o-646fe829bea7f",
      sortOrder: 35,
    },
    {
      id: 567,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-gpbCOfQuU-fplEnQYavbxzI4SAwQF--g3DjB--xrMNB14-647003d412d5d",
      sortOrder: 36,
    },
    {
      id: 568,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-UQ7wrfiKVtyQdiNz--3jllDFQzIhURmBZ9RMrlpwy4A-646fd318aa6ce",
      sortOrder: 37,
    },
    {
      id: 569,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539---BcPpAcHoe9pfiRtIAD9swBbDUHK8MDiqWr4UVrw6cY-646fe82d68c51",
      sortOrder: 38,
    },
    {
      id: 570,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-BhigNwKpJPbXRqlGWg-XA1f7kwvt5cXJfLysU74Wuso-646fd31e7d5ab",
      sortOrder: 39,
    },
    {
      id: 571,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539---r8i5rG--GR8WpNdWWsIZ1--R613--u0SbHy-l95n07TEU-647003d640c00",
      sortOrder: 40,
    },
    {
      id: 572,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-m2mwVATm0izrwMs7le601Bs8WT2peHDbGHgF9T--ffVg-646fd324de9e9",
      sortOrder: 41,
    },
    {
      id: 573,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-hmUyVidIm-wu9GeFnp1Hep23W6P7hneG7SJqIpNWbXc-646fd328a7bc4",
      sortOrder: 42,
    },
    {
      id: 574,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-KfRnsUCIyc3tmc29wZ8kGYVgqZ3uh7QA6tOiAYR0Z7o-646fd32c8833f",
      sortOrder: 43,
    },
    {
      id: 575,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-rCa7vDVnX-FyYLzEZAjja-WFF9t8-xwxeo71OgzdXtM-646fd3307ffac",
      sortOrder: 44,
    },
    {
      id: 576,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-Zgfr4mE35ondTPw7JrtrqDzRH8gZYO2BGC6VKBbjHfM-646fd3343120f",
      sortOrder: 45,
    },
    {
      id: 577,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-NCbB6IPDGFXph--PCvmEP6vPVyXDCb--qBB4MHpmq--Gs-646fd337dbc31",
      sortOrder: 46,
    },
    {
      id: 578,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-Fe1PJGE1ZfcFuE4LOgZMIz--8gAmJHoUQ41yIuz73yvI-646fe83124fce",
      sortOrder: 47,
    },
    {
      id: 579,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-wAkG7Ajfj3gV4FM8vOGzlGtHSvdvsccpwf1GMVIEccE-647003d81a4d8",
      sortOrder: 48,
    },
    {
      id: 580,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-kX3gT8BzmTAWcdoEHAbOB-Xk7F3jLoTtNoQvqusjvqc-646fd34119990",
      sortOrder: 49,
    },
    {
      id: 581,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-byUpsDJ-5zsFwnk1qiszKoTtNbUGB-nNDV5x5K-ECnU-646fe834c81a4",
      sortOrder: 50,
    },
    {
      id: 582,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-9-Lc2uXoJyPP41iM8ImcL--7BpRUKrfneT0C0w1063xc-646fe83840c4d",
      sortOrder: 51,
    },
    {
      id: 583,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-n9v6CEOmr5aTVFT3Mi8jLFHFjLF8f7yQXa4ZiQXK1gY-646fd34ac59a4",
      sortOrder: 52,
    },
    {
      id: 584,
      caption: "",
      vrboCaption: null,
      airbnbCaption: "",
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-Gg-u5UFF9qK25gB4BU76EGgwKnNvgeRWjY3I9cJOgoc-646fe83a665e6",
      sortOrder: 53,
    },
    {
      id: 585,
      caption: null,
      vrboCaption: null,
      airbnbCaption: null,
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-lQrAzvpdtn4VnLpAt48fJUC27MSIB01UOm6Hmn-mVDU-6585107dea716",
      sortOrder: 54,
    },
    {
      id: 586,
      caption: null,
      vrboCaption: null,
      airbnbCaption: null,
      url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/64614-169539-0sxEIleCJ7s9vKCfTUmiLrhEH6NzUQTTxP1h0zRQgu0-65882cca121ea",
      sortOrder: 55,
    },
  ],
};
const ListItems = [
  {
    id: 1,
    name: "General Information",
    subTitle: "Description,Wifi & more",
    current: false,
    icon: InformationCircleIcon,
  },
  {
    id: 2,
    name: "Address",
    subTitle: "2/137a2 new york",
    current: false,
    icon: MapIcon,
  },
  {
    id: 3,
    name: "Check-in & Check-out",
    subTitle: "Step by step check-in/check-out instructions & times",
    current: false,
    icon: LockClosedIcon,
  },
  {
    id: 4,
    name: "Guidebook",
    subTitle: "Custom information sections",
    current: false,
    icon: DocumentTextIcon,
  },
  {
    id: 5,
    name: "Fees",
    subTitle: "Pet fees,deposit & more",
    current: false,
    icon: DocumentTextIcon,
  },
  {
    id: 6,
    name: "Upsells",
    subTitle: "Early check-in/late check-out & more",
    current: false,
    icon: DocumentTextIcon,
  },
  {
    id: 7,
    name: "Ai knowledge",
    subTitle: "Answers to common qustions",
    current: false,
    icon: BookOpenIcon,
  },
  {
    id: 8,
    name: "Policies & Custom fields",
    subTitle: "House roles and custom fields",
    current: false,
    icon: BookOpenIcon,
  },
  {
    id: 9,
    name: "Pictures",
    subTitle: "55 photos",
    current: false,
    icon: PhotoIcon,
  },
  {
    id: 10,
    name: "Devices",
    subTitle: "Manage smart home devices",
    current: false,
    icon: LockClosedIcon,
  },
];

interface SelectedItem {
  icon: any;
  name: string;
  subTitle: string;
}

const InfoDetail = ({ screenName, setScreenName }: any) => {
  const [usertab, setUsertab] = useState(tabs);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [initialTabValue, setInitialTabValue] = useState(null);
  const [type, setType] = useState("userInfo");

  const handleTabClick = (item: any) => {
    setActiveTab(item.id);
  };

  const handleSelectedData = (data: any) => {
    console.log(selectedItem, "selectedItem");
    setInitialTabValue(data.id);
    setSelectedItem(data);
  };

  function ListDetails() {
    return (
      <>
        <ul role="list" className="divide-y divide-gray-100">
          {ListItems.map((person, index) => (
            <li
              onClick={() => handleSelectedData(person)}
              key={index}
              className="cursor-pointer bg-gray-200 relative flex justify-between gap-x-4 px-2 py-5 mt-2 rounded-md hover:bg-gray-300"
            >
              <div className="flex min-w-0 gap-x-4 items-center">
                <div>
                  {
                    <person.icon
                      className="h-5 w-5 flex-none text-gray-400"
                      aria-hidden="true"
                    />
                  }
                </div>
                <div className="min-w-0 flex-auto ">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <div>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {person.name}
                    </div>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <div className="relative truncate hover:underline">
                      {person.subTitle}
                    </div>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  const goBackUi = () => {
    return (
      <>
        <button
          onClick={() => setScreenName("userInfo")}
          type="button"
          className="inline-flex items-center gap-x-1.5   px-3 py-2 text-md font-semibold text-indigo-500 "
        >
          <ArrowLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Back
        </button>
        <div className="flex border border-b mt-2 text-gray-100"></div>
      </>
    );
  };

  const selectedHotelDetail = () => {
    return (
      <>
        <div className="relative mt-4 cursor-pointer">
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <Image
              className="aspect-[3/2]  h-52  w-full rounded-md object-cover "
              src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hotel"
              width={500}
              height={500}
            />

            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-lg text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    helo
                  </a>
                </h3>
                <div className="flex items-center">
                  <MapPinIcon
                    className="block h-4 w-4 text-white"
                    aria-hidden="true"
                  />
                  <p aria-hidden="true" className="mt-1 pl-2 text-white">
                    salem
                  </p>
                </div>
                <div className="mt-1 underline text-orange-300">
                  {" "}
                  preview Boarding Pass
                </div>
                <div className="flex items-center mt-1">
                  <p className="text-white mr-2 hover:text-gray-50 cursor-pointer">
                    {" "}
                    Click the plus to add a tag.
                  </p>
                  <PlusIcon
                    className="h-5 w-5 text-white hover:text-gray-50 cursor-pointer"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex items-center mt-1">
                  <UserIcon
                    className="block h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <p aria-hidden="true" className="mt-1 pl-2 text-white">
                    4
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  console.log(selectedItem, "chaedddzzzxxx");

  function dynamicContentUi() {
    return (
      <>
        <div className="md:flex md:items-center md:justify-between py-2 px-2 ">
          <>
            <div className="py-2">
              <div className="flex gap-2">
                <div>
                  {selectedItem?.icon ? (
                    <selectedItem.icon className="h-5 w-5 text-gray-500" />
                  ) : null}
                </div>

                <div>{selectedItem?.name ?? ""}</div>
              </div>

              <p className="text-sm px-1 font-medium text-gray-500">
                {selectedItem?.subTitle ?? ""}
              </p>
            </div>
          </>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
            >
              English
            </button>
          </div>
        </div>
        <div className="border border-b text-gray-600"></div>
      </>
    );
  }

  return (
    <div>
      {goBackUi()}
      {initialTabValue === null ? (
        <>
          {selectedHotelDetail()}

          <div className="ml-2">
            <CommonTabs tab={usertab} onClick={handleTabClick} />
          </div>

          {activeTab == 1 ? (
            ListDetails()
          ) : (
            <p className="flex justify-center items-center w-full h-80">
              <div className="flex w-full bg-gray-200 p-1 mt-2 text-gray-600 justify-center rounded-md">
                No automatted message...
              </div>
            </p>
          )}
        </>
      ) : (
        <>
          {(initialTabValue !== 5 || initialTabValue !== 6) && selectedItem
            ? dynamicContentUi()
            : null}

          {initialTabValue === 1 ? (
            <div className="px-2">
              <GeneralInfo selectedItem={selectedItem} />
            </div>
          ) : initialTabValue === 2 ? (
            <Address selectedItem={selectedItem} />
          ) : initialTabValue === 3 ? (
            <CheckInandOut selectedItem={selectedItem} />
          ) : initialTabValue === 4 ? (
            <GuideBook />
          ) : initialTabValue === 5 ? (
            <Fees />
          ) : initialTabValue === 6 ? (
            <Upsells />
          ) : initialTabValue === 7 ? (
            <Aiknowledge />
          ) : initialTabValue === 8 ? (
            <Policies />
          ) : initialTabValue === 9 ? (
            <HotelPicture selectedItem={sampleJson} />
          ) : initialTabValue === 10 ? (
            <Device />
          ) : null}
        </>
      )}
    </div>
  );
};

export default InfoDetail;
