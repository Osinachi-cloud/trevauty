// import { CanActivateFn, Router } from '@angular/router';
// import { TokenService } from '../services/token.service';
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   const token = TokenService.getToken();
//   let allowAccess : boolean = false;

//   // get current page

//   // const currentPage = route.url[0].path;
//   const router = inject(Router);
//   // if (currentPage == "nameOfPage"){
//   //   return true;
//   // }
//   // else{
//   //   alert("Access denied");
//   //   return false;
//   // }

//   if (token) {
//     // Check if the token is not expired
//     const isTokenValid = !TokenService.isTokenExpired(token);

//     if (isTokenValid) {
//       allowAccess = true;
//       return allowAccess; // Allow access to the route
//     }
//   }else{
//     router.navigate(['']);
//     allowAccess = false;
//     return allowAccess;
//   }

//   // // If the token is missing or expired, redirect to the login page
//   // return state.url !== '/login' ? ['/login'] : true;
//       // allowAccess = true;
//   // console.log("allowAccess =====>>>>>", allowAccess)
//   return false;
// };
