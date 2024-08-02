import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";


function ProtectedRoute({ featuresNPermission }) {
     
    const { pathname } = useLocation()
    const featuresWthUrl = [
        { feature: 'roles', add: 'roleInfoTable', edit: '/roleInfoTable/' },
        { feature: 'users', add: 'userSignUp'}
    ]

    function matchPermissionUrls(feature, permissionUrl) {
       let x = pathname.toLowerCase()

       let isMatched = false;
        if ( x.includes(feature.add && permissionUrl?.add?.toLowerCase ())) {
            isMatched = true;
        } 
         if (x.includes(feature?.edit && permissionUrl?.edit?.toLowerCase())) {
                isMatched = true;   
         }
       
        return isMatched;
    }
    
    let foundFeature =featuresNPermission && featuresNPermission?.find((f) => {
        if (!pathname.toLocaleLowerCase().includes(f.fature)) {
           let permissionFound =  featuresWthUrl.find((featureWdUrl) => {

                if (featureWdUrl.feature === f.feature.toLocaleLowerCase() && matchPermissionUrls(f, featureWdUrl)) {
                     return f;
                }
            })
             return permissionFound;
        } else {

            return f;
        }

    })
    
    if (featuresNPermission.length && !foundFeature) {
        let featureName = featuresNPermission[0]?.feature.toLowerCase()
        return <Navigate to={`/admin/${featureName}`} />
    }


}
export default ProtectedRoute;