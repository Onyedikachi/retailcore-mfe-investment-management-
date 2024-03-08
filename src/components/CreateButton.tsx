import { ButtonOptions } from "@app/constants";
import { AppContext } from "@app/utils";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  Fragment,
} from "react";
import { FaCaretRight } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from "react-router-dom";

interface CreateProp {
  title: string;
  key: string;
  isUrl: boolean;
  links: any;
  url: string;
  permission: string;
}

const LinkItem = ({
  children,
  buttonOptions,
  permissions,
  setActive,
  active,
  activeChild,
}) => {
  const windowSize = useRef(window.innerWidth);
  const navigate = useNavigate();
  return (
    <ul>
      {buttonOptions?.map((item: CreateProp) => (
        <li className="group" key={item.key}>
          <button
            disabled={!permissions.includes(item?.permission)}
            data-testid="btn-1"
            onClick={() => {
              if (!permissions.includes(item?.permission)) return;
              if (item.isUrl) {
                goToUrl(item.url, navigate);
              } else {
                setActive(buttonOptions.find((i) => i.key === item.key));
              }
            }}
            className={`disabled:opacity-50 disabled:cursor-not-allowed w-full z-10 relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 group-last:rounded-b-lg hover:bg-[#F9E5E5] cursor-pointer 
            ${activeChild?.key?.toLowerCase() === item.key
                ? "bg-[#F9E5E5]"
                : "bg-white"
              }`}
          >
            <span>{item.title}</span> {!item.isUrl && <FaCaretRight />}
            {!item.isUrl && activeChild?.key?.toLowerCase() === item.key && (
              <div className="z-10 absolute top-0 -right-[212px] w-[209px] bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]">
                {children}
              </div>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export function closeButton(
  setIsOpen,
  setSecondActive,
  setFourthActive,
  setThirdActive,
  setFirstActive
) {
  setIsOpen(false);
  setFirstActive(null);
  setSecondActive(null);
  setThirdActive(null);
  setFourthActive(null);
}
export function goToUrl(url, navigate) {
  if (url && navigate) {
    navigate(url);
  }
}
export default function CreateButton({ children }) {
  const { permissions } = useContext(AppContext);
  const navigate = useNavigate();
  const windowSize = useRef(window.innerWidth);
  const [firstActive, setFirstActive] = useState(null);
  const [secondActive, setSecondActive] = useState(null);
  const [thirdActive, setThirdActive] = useState(null);
  const [fourthActive, setFourthActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSecondActive(null);
  }, [firstActive]);
  useEffect(() => {
    setThirdActive(null);
    setFourthActive(null);
  }, [setSecondActive]);
  useEffect(() => {
    setFourthActive(null);
  }, [setThirdActive]);

  return (
    <div data-testid="top-bar">
      <OutsideClickHandler
        onOutsideClick={() =>
          closeButton(
            setIsOpen,
            setSecondActive,
            setFourthActive,
            setThirdActive,
            setFirstActive
          )
        }
      >
        <div className="relative">
          <div
            data-testid="click-element-test"
            className="fixed top-0 h-2 w-2 bg-transparent z-[-4px]"
          >
            {" "}
          </div>
          <span
            onMouseOver={() => { }}
            role="button"
            tabIndex={0}
            data-testid="btn-create"
            onClick={() => setIsOpen(true)}
          >
            {children}
          </span>
          {isOpen && (
            <div className="top-0 absolute w-[286px] z-10 bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]">
              <LinkItem
                {...{
                  buttonOptions: ButtonOptions,
                  permissions,
                  setActive: setFirstActive,
                  active: firstActive,
                  activeChild: firstActive,
                }}
              >
                <LinkItem
                  {...{
                    buttonOptions: firstActive?.links,
                    permissions,
                    setActive: setSecondActive,
                    active: secondActive,
                    activeChild: secondActive,
                  }}
                >
                  <LinkItem
                    {...{
                      buttonOptions: secondActive?.links,
                      permissions,
                      setActive: setThirdActive,
                      active: secondActive,
                      activeChild: thirdActive,
                    }}
                  >
                    <LinkItem
                      {...{
                        buttonOptions: thirdActive?.links,
                        permissions,
                        setActive: setFourthActive,
                        active: secondActive,
                        activeChild: fourthActive,
                      }}
                    >
                      <LinkItem
                        {...{
                          buttonOptions: fourthActive?.links,
                          permissions,
                          setActive: () => { },
                          active: secondActive,
                          activeChild: null,
                        }}
                      >
                        <Fragment></Fragment>
                      </LinkItem>
                    </LinkItem>
                  </LinkItem>
                </LinkItem>
              </LinkItem>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </div>
  );
}
