import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import ModalLayout from "./Layout";
import {
  useGetUserQuery,
  useGetUsersPermissionsQuery,
} from "../../api";
import { removeNullEmptyKeys } from "@app/utils";
import { ProductSearch, Button } from "@app/components";
interface Rejection {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  setReason: (e: string) => void;
  reason: string;
  setRouteTo?: any;
  creatorId: string;
}

export function handleSuccess(userIsSuccess, setUsers, branchMembersData) {
  if (userIsSuccess) {
    setUsers(
      branchMembersData?.data?.map((i) => {
        return {
          ...i,
          name: i.fullname,
          value: i.id,
        };
      })
    );
  }
}
export default function Rejection({
  isOpen,
  setIsOpen,
  onConfirm,
  setReason,
  reason,
  setRouteTo,
  creatorId,
}: Rejection): React.JSX.Element {
  const [selected, setSelected] = React.useState<any>(null);
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [queryParams, setQueryParams] = React.useState({
    page: 1,
    size: 1500,
    search: "",
    branchId: "12",
    state: "ACTIVE",
  });
  // const {
  //   data: branchMembersData,
  //   isSuccess: userIsSuccess,
  //   isLoading: userLoading,
  // } = useGetBranchMembersQuery(queryParams, {
  //   refetchOnMountOrArgChange: true,
  // });

  const { data, isSuccess, isError, isLoading } = useGetUserQuery(creatorId);
  const {
    data: branchMembersData,
    isSuccess: userIsSuccess,
    isLoading: userLoading,
  } = useGetUsersPermissionsQuery({ permissions: ["APPROVE_BRANCH_REQUESTS"] });

  React.useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
    if (isError) {
      setUser(null);
    }
  }, [isSuccess, data, isError]);
  React.useEffect(() => {
    handleSuccess(userIsSuccess, setUsers, branchMembersData);
  }, [userIsSuccess]);

  React.useEffect(() => {
    if (selected) {
      setRouteTo({
        userid: selected?.id,
        email: selected?.email,
        fullname: selected?.fullname,
      });
    }
  }, [selected]);

  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen} data-testid="Layout">
      <div className="w-[700px] p-8 rounded-lg bg-white text-left shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="flex justify-between items-center pb-4 mb-[42px] border-b border-[#CCCCCC]">
          <h3 className="text-[#747373] font-bold text-xl uppercase">
            Rejection
          </h3>
          <button
            data-testid="cancel-btn"
            onClick={() => setIsOpen(false)}
            className="p-2 outline-none bg-transparent"
          >
            <FaTimes className="text-[#002266] opacity-60 hover:opacity-50" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="flex flex-col">
            <span className="mb-2 text-[#636363] font-medium text-base">
              Route Request to
            </span>
            <div
              className="relative
         "
            >
              <ProductSearch
                placeholder="Type, search and select"
                options={users}
                ledger={[]}
                handleOptions={(e) => setSelected(e)}
                data-testis="search"
              />
            </div>
          </div>
          {!isLoading && (!user || !user?.is_active) && (
            <div className="flex items-center gap-[15px]">
              <RiErrorWarningFill className="text-[30px] text-sterling-red-800" />
              <span className="text-base text-[#636363]">
                Request initiator is currently unavailable, please re-route to
                another user
              </span>
            </div>
          )}
        </div>
        <div>
          <div className="mb-14">
            <label htmlFor="reason" className="block text-[#333333] mb-2">
              Provide reason for rejection
            </label>
            <input
              id="reason"
              name="reason"
              className="max-h-[271px] outline-none border border-[#AAAAAA] rounded-lg px-3 py-[11px] w-full h-[120px]"
              placeholder="Reason"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center">
            <Button
              type="button"
              data-testid="submit-btn"
              onClick={() => onConfirm()}
              disabled={reason?.length < 3}
              className="rounded-lg text-base font-medium py-[5px] bg-sterling-red-800 border border-[#D8DAE5] text-white px-10"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
