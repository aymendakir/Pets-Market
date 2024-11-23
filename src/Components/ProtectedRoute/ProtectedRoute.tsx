import {Navigate, useLocation} from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const role = new URLSearchParams(location.search).get('role');
    const store_name = new URLSearchParams(location.search).get('Store_name');
    const Bio = new URLSearchParams(location.search).get('Bio');
    const seller_id = new URLSearchParams(location.search).get('Seller_id');
    if (role) {

       if (role==="seller") {
           if (store_name==="null"||Bio==="null"){
               return <Navigate to={`/Seller/Customization?seller_id=${seller_id}`} replace />;
           }
           else{
               return <Navigate to="/Seller/Dashboard"  replace/>;

           }

       }else if(role==="client") {
           return <Navigate to="/"  replace/>;


       }
    }
    return children;
};