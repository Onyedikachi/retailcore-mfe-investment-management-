import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  useGetLinksQuery,
  useUpdateLinkMutation,
  useAddLinkMutation,
} from "@app/api";

const defaultLink = {
  isDefault: true,
  count: 1,
  name: "Product management",
  category: "ProductManagement",
  link: "product-management",
};

export function handleLinksUpdate(
  isLinksQuerySuccessful,
  quickLinks,
  setLinks,
  addLink,
  updateLink,
  baseUrl
) {
  if (isLinksQuerySuccessful) {
    const moduleName = "Product Factory";
    const moduleLink = "product-factory/investment";

    // Get
    if (quickLinks && quickLinks.data && quickLinks.data.length > 0) {
      setLinks([defaultLink, ...quickLinks.data]);
    }

    // Check if quickLinks has a link to this page
    const hasPageLink =
      quickLinks && quickLinks.data
        ? quickLinks?.data.some(
          (link) => link.link === `${baseUrl}/product-factory/investment`
        )
        : false;

    // Add
    if (
      (quickLinks && !quickLinks.data) ||
      quickLinks?.data?.length === 0 ||
      !hasPageLink
    ) {
      addLink([
        {
          link: `product-factory/investment`,
          name: "Product Factory",
          category: "ProductFactory",
          isDefault: true,
        },
      ]);
    }

    // Update
    if (hasPageLink) {
      updateLink({
        moduleName,
        moduleLink,
      });
    }
  }
}

// Usage example:

export default function QuickLinks() {
  const [isOpen, setIsOpen] = useState(true);

  const [links, setLinks] = useState([defaultLink]);
  const {
    data: quickLinks,
    isLoading,
    isFetching,
    isSuccess: isLinksQuerySuccessful,
  } = useGetLinksQuery();

  const [updateLink] = useUpdateLinkMutation();

  const [addLink] = useAddLinkMutation();
  const baseUrl = "https://seabaas.dev.bepeerless.co";

  React.useEffect(() => {
    handleLinksUpdate(
      isLinksQuerySuccessful,
      quickLinks,
      setLinks,
      addLink,
      updateLink,
      baseUrl
    );
  }, [quickLinks]);
  return (
    <div
      data-testid="quick-links"
      className="border border-[#E5E9EB] rounded-lg bg-white px-[13px] py-8 w-[300px]"
    >
      <h1 className="uppercase text-xl mb-5 font-medium">Quick Links</h1>
      <hr className="border-[#ddd] mb-[15px]" />
      {isOpen && (
        <div className="relative bg-[#F9F2F2] mb-7  rounded-[6px] border border-[#E5E9EB] p-4">
          <h2 className="text-sm font-semibold mb-4">
            Suggested from your activity
          </h2>
          <p className="text-sm text-[#5B6871">
            As you use the application, suggested items will automatically show
            up here.
          </p>
          <span
            onMouseOver={() => { }}
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-2"
            data-testid="close"
          >
            {" "}
            <FaTimes className="w-3 h-3  text-[#002266]/40" />
          </span>
        </div>
      )}
      <div>
        <ul className="grid grid-cols-2 gap-11">
          {links.map((item, idx) => (
            <li key={`idx-${idx + 1}`}>
              <Link
                to={item?.link}
                role="link"
                className="flex flex-col items-center justify-center text-center"
              >
                <span className="mb-2 block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="88"
                    height="88"
                    viewBox="0 0 88 88"
                    fill="none"
                  >
                    <circle cx="44" cy="44" r="44" fill="#F9F2F2" />
                    <path
                      d="M60.4167 42.6667C59.8641 42.6667 59.3342 42.8862 58.9435 43.2769C58.5528 43.6676 58.3333 44.1975 58.3333 44.75V57.25C58.3333 57.8025 58.1138 58.3324 57.7231 58.7231C57.3324 59.1138 56.8025 59.3333 56.25 59.3333H31.25C30.6975 59.3333 30.1676 59.1138 29.7769 58.7231C29.3862 58.3324 29.1667 57.8025 29.1667 57.25V32.25C29.1667 31.6975 29.3862 31.1676 29.7769 30.7769C30.1676 30.3862 30.6975 30.1667 31.25 30.1667H43.75C44.3025 30.1667 44.8324 29.9472 45.2231 29.5565C45.6138 29.1658 45.8333 28.6359 45.8333 28.0833C45.8333 27.5308 45.6138 27.0009 45.2231 26.6102C44.8324 26.2195 44.3025 26 43.75 26H31.25C29.5924 26 28.0027 26.6585 26.8306 27.8306C25.6585 29.0027 25 30.5924 25 32.25V57.25C25 58.9076 25.6585 60.4973 26.8306 61.6694C28.0027 62.8415 29.5924 63.5 31.25 63.5H56.25C57.9076 63.5 59.4973 62.8415 60.6694 61.6694C61.8415 60.4973 62.5 58.9076 62.5 57.25V44.75C62.5 44.1975 62.2805 43.6676 61.8898 43.2769C61.4991 42.8862 60.9692 42.6667 60.4167 42.6667Z"
                      fill="#CF2A2A"
                    />
                    <path
                      d="M52.0833 30.1667H55.375L42.2708 43.25C42.0755 43.4437 41.9205 43.6741 41.8148 43.928C41.709 44.1818 41.6545 44.4541 41.6545 44.7292C41.6545 45.0042 41.709 45.2765 41.8148 45.5304C41.9205 45.7842 42.0755 46.0147 42.2708 46.2083C42.4645 46.4036 42.6949 46.5586 42.9488 46.6644C43.2026 46.7701 43.4749 46.8246 43.75 46.8246C44.025 46.8246 44.2973 46.7701 44.5512 46.6644C44.805 46.5586 45.0354 46.4036 45.2291 46.2083L58.3333 33.125V36.4167C58.3333 36.9692 58.5528 37.4991 58.9435 37.8898C59.3342 38.2805 59.8641 38.5 60.4166 38.5C60.9692 38.5 61.4991 38.2805 61.8898 37.8898C62.2805 37.4991 62.5 36.9692 62.5 36.4167V28.0833C62.5 27.5308 62.2805 27.0009 61.8898 26.6102C61.4991 26.2195 60.9692 26 60.4166 26H52.0833C51.5308 26 51.0009 26.2195 50.6101 26.6102C50.2194 27.0009 50 27.5308 50 28.0833C50 28.6359 50.2194 29.1658 50.6101 29.5565C51.0009 29.9472 51.5308 30.1667 52.0833 30.1667Z"
                      fill="#CF2A2A"
                    />
                  </svg>
                </span>
                <span data-testid="link-name" className="block text-sm">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
