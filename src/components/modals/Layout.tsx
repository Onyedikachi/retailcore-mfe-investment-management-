import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface LayoutProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

export default function Layout({
  isOpen,
  setIsOpen,
  children,
}: LayoutProps): React.JSX.Element {
  return (
    <>
      {isOpen && (
        <Transition appear={isOpen} show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[9999]"
            data-testid="dialog"
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div data-testid="Layout" className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="relative transform overflow-hidden rounded-lg text-left align-middle  transition-all">
                    {children}
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
