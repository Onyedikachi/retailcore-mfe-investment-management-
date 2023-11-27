// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "../layouts/Layout";
// import BranchManagement from "../pages/branch-management";
// import PreviewSummary from "../pages/branch-management/preview-summary/PreviewSummary";
// import CreateBranch from "../pages/branch-management/create-branch/CreateBranch";

// import BranchCreationReview from "../pages/branch-management/branch-creation-review/BranchCreationReview";
// import BranchDeactivationReview from "../pages/branch-management/branch-deactivation-review/BranchDeactivationReview";
// import BranchModificationReview from "../pages/branch-management/branch-modification-review/BranchModificationReview";
// import BulkBranchCreationReview from "../pages/branch-management/bulk-branch-creation-review/BulkBranchCreationReview";
// export const BasePath = "/branch-management";
// export const Router = function () {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/branch-management" element={<Layout />}>
//           <Route index element={<BranchManagement />} />
//           <Route path="create" element={<CreateBranch />} />
//           {/* <Route path="edit" element={<EditBranch />} /> */}
//           <Route path="preview-summary/:type" element={<PreviewSummary />} />
//           <Route path="branch-creation-review" element={<BranchCreationReview />} />
//           <Route
//             path="branch-deactivation-review"
//             element={<BranchDeactivationReview />}
//           />
//           <Route
//             path="branch-modification-review"
//             element={<BranchModificationReview />}
//           />
//           <Route
//             path="bulk-branch-creation-review"
//             element={<BulkBranchCreationReview />}
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };
