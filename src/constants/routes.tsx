// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "../layouts/Layout";
// import ProductManagement from "../pages/branch-management";
// import PreviewSummary from "../pages/branch-management/preview-summary/PreviewSummary";
// import CreateProduct from "../pages/branch-management/create-branch/CreateProduct";

// import ProductCreationReview from "../pages/branch-management/branch-creation-review/ProductCreationReview";
// import ProductDeactivationReview from "../pages/branch-management/branch-deactivation-review/ProductDeactivationReview";
// import ProductModificationReview from "../pages/branch-management/branch-modification-review/ProductModificationReview";
// import BulkProductCreationReview from "../pages/branch-management/bulk-branch-creation-review/BulkProductCreationReview";
// export const BasePath = "/branch-management";
// export const Router = function () {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/branch-management" element={<Layout />}>
//           <Route index element={<ProductManagement />} />
//           <Route path="create" element={<CreateProduct />} />
//           {/* <Route path="edit" element={<EditProduct />} /> */}
//           <Route path="preview-summary/:type" element={<PreviewSummary />} />
//           <Route path="branch-creation-review" element={<ProductCreationReview />} />
//           <Route
//             path="branch-deactivation-review"
//             element={<ProductDeactivationReview />}
//           />
//           <Route
//             path="branch-modification-review"
//             element={<ProductModificationReview />}
//           />
//           <Route
//             path="bulk-branch-creation-review"
//             element={<BulkProductCreationReview />}
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };
