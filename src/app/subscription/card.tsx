"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";

const AccessItem = ({ text, isEssential }: any) => (
  <li className="pl-4 flex justify-start gap-2 items-center">
    <span className="text-purple-600">
      <svg
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.06215 1.53451C7.38431 0.663888 8.61569 0.663888 8.93785 1.53451L9.3138 2.55049C10.0228 4.46653 11.5335 5.9772 13.4495 6.6862L14.4655 7.06215C15.3361 7.38431 15.3361 8.61569 14.4655 8.93785L13.4495 9.3138C11.5335 10.0228 10.0228 11.5335 9.3138 13.4495L8.93785 14.4655C8.61569 15.3361 7.38431 15.3361 7.06215 14.4655L6.6862 13.4495C5.9772 11.5335 4.46653 10.0228 2.55049 9.3138L1.53451 8.93785C0.663888 8.61569 0.663888 7.38431 1.53451 7.06215L2.55049 6.6862C4.46653 5.9772 5.9772 4.46653 6.6862 2.55049L7.06215 1.53451Z"
          fill={`${isEssential ? "#FFFF55" : "#7000FF"}`}
        />
      </svg>
    </span>
    <span>{text}</span>
  </li>
);

const SubscriptionCard = ({
  isLoading,
  name,
  price,
  button,
  plan,
  isEssential,
  isStarter,
  createCheckoutSession,
  planId,
}: any) => {
  const cardClass = isEssential ? "bg-[#7000FF] text-white" : "bg-white";
  const textClass = isEssential ? "text-white" : "text-slate-400";
  const saveDiscount = !isStarter ? (
    <div>
      <p className="text-sm">Billed {plan}ly you</p>
      <div className=" space-x-2">
        <span className="px-2 py-[2px] text-white font-medium bg-red-500 text-xs rounded-lg">
          Save $58
        </span>
        <span className="px-2 py-[2px] text-white font-medium bg-red-500 text-xs rounded-lg">
          - $58%
        </span>
      </div>
    </div>
  ) : (
    <div className="h-12"></div>
  );

  const accessListStarter = [
    { text: "All core reports for journey analysis" },
    { text: "Templates to get started quickly" },
    { text: "20 Integrations" },
    { text: "Unlimited collaborators" },
  ];

  const accessListEssential = [
    { text: "Mixpanel Modeling Layer" },
    { text: "Group Analytics" },
    { text: "Data Pipelines add-ons" },
    { text: "Unlimited integrations" },
  ];

  const accessListProfessional = [
    { text: "Advanced access controls" },
    { text: "Shared Data Views for collaboration" },
    { text: "Automated provisioning & sso" },
    { text: "Prioritized support" },
  ];

  return (
    <div className={`${cardClass} p-4 w-80 h-auto rounded-xl space-y-3`}>
      <p className={` text-lg font-semibold`}>
        {name}{" "}
        {isEssential && (
          <span className="ml-3 px-2 py-[1px] text-[8pt] bg-white rounded text-purple-600">
            Popular Plan
          </span>
        )}
      </p>
      <p className={`${textClass} text-xs`}>
        In publishing and graphic design, Lorem placeholder text
      </p>
      <p>
        <span className="text-5xl font-bold">{price}</span>$/<span>{plan}</span>
      </p>
      {saveDiscount}
      <hr />
      <div>
        <h1>Access to</h1>
        <ul className="list-none text-sm space-y-4 mt-2">
          {isStarter &&
            accessListStarter.map((item, index) => (
              <AccessItem
                key={index}
                text={item.text}
                isEssential={isEssential}
              />
            ))}
          {isEssential &&
            accessListEssential.map((item, index) => (
              <AccessItem
                key={index}
                text={item.text}
                isEssential={isEssential}
              />
            ))}
          {!isStarter &&
            !isEssential &&
            accessListProfessional.map((item, index) => (
              <AccessItem
                key={index}
                text={item.text}
                isEssential={isEssential}
              />
            ))}
        </ul>
        <button
          onClick={() => createCheckoutSession(planId)}
          className={`${
            isEssential ? "bg-white text-purple-600" : "border-2 border-black"
          } mt-4 px-4 py-2 rounded-xl `}
        >
          {button}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
