// let tbody = document.getElementsByTagName("table")[0].tBodies[0];
// let addButton = document.getElementsByClassName("add-cart");
// let totalPrice = document.getElementById("total-price");
// let input = document.getElementsByTagName("input");

// function addToChart() {
//   switch (this.id) {
//     case "onsite-rapid":
//       tbody.innerHTML += `<tr>
//           <td>ONSITE Rapid</td>
//           <td>Rp950.000</td>
//           <td class="w-25">
//             <input type="number" min="1" class="form-control w-100" value="1" />
//           </td>
//           <td>
//               <button class="btn btn-danger remove">Remove</button>
//           </td>
//         </tr>`;
//       break;
//     case "onsite-swab":
//       tbody.innerHTML += `<tr>
//           <td>ONSITE Swab</td>
//           <td>Rp725.000</td>
//           <td class="w-25">
//             <input type="number" min="1" class="form-control w-100" value="1" />
//           </td>
//           <td>
//               <button class="btn btn-danger remove">Remove</button>
//           </td>
//         </tr>`;
//       break;
//     case "zybio-rapid":
//       tbody.innerHTML += `
//         <tr>
//           <td>ZYBIO Rapid</td>
//           <td>Rp850.000</td>
//           <td class="w-25">
//             <input type="number" min="1" class="form-control w-100" value="1" />
//           </td>
//           <td>
//               <button class="btn btn-danger remove">Remove</button>
//           </td>
//         </tr>
//       `;
//       break;
//     case "zybio-swab":
//       tbody.innerHTML += `
//         <tr>
//           <td>ZYBIO Swab</td>
//           <td>Rp1.000.000</td>
//           <td class="w-25">
//             <input type="number" min="1" class="form-control w-100" value="1" />
//           </td>
//           <td>
//               <button class="btn btn-danger remove">Remove</button>
//           </td>
//         </tr>
//       `;
//       break;
//     case "zybio-neutralizing":
//       tbody.innerHTML += `
//         <tr>
//           <td>ZYBIO Neutralizing</td>
//           <td>Rp650.000</td>
//           <td class="w-25">
//             <input type="number" min="1" class="form-control w-100" value="1" />
//           </td>
//           <td>
//               <button class="btn btn-danger remove">Remove</button>
//           </td>
//         </tr>
//       `;
//       break;
//     case "reagen-detection":
//       tbody.innerHTML += `
//         <tr>
//           <td>Reagen Detection</td>
//           <td>Rp200.000</td>
//           <td class="w-25">
//             <input type="number" min="1" class="form-control w-100" value="1" />
//           </td>
//           <td>
//               <button class="btn btn-danger remove">Remove</button>
//           </td>
//         </tr>
//       `;
//       break;
//     case "kybio-swab":
//       tbody.innerHTML += `
//         <tr>
//           <td>KY-BIO Swab</td>
//           <td>Rp900.000</td>
//           <td class="w-25">
//             <input type="number" min="1" class="form-control w-100" value="1" />
//           </td>
//           <td>
//               <button class="btn btn-danger remove">Remove</button>
//           </td>
//         </tr>
//       `;
//       break;
//     case "aehealth-neutralizing":
//       tbody.innerHTML += `
//         <tr>
//           <td>AEHEALTH Neutralizing</td>
//           <td>Rp950.000</td>
//           <td class="w-25">
//             <input type="number" min="1" class="form-control w-100" value="1" />
//           </td>
//           <td>
//               <button class="btn btn-danger remove">Remove</button>
//           </td>
//         </tr>
//       `;
//       break;
//     case "reagen-extraction":
//       tbody.innerHTML += `
//         <tr>
//           <td>Reagen Extraction</td>
//           <td>Rp800.000</td>
//           <td class="w-25">
//             <input type="number" min="1" class="form-control w-100" value="1" />
//           </td>
//           <td>
//               <button class="btn btn-danger remove">Remove</button>
//           </td>
//         </tr>
//       `;
//       break;
//   }
// }

// [...addButton].forEach((x) => x.addEventListener("click", addToChart));

// document.addEventListener("click", function (event) {
//   if (event.target.classList.contains("remove")) {
//     event.target.parentNode.parentNode.remove();
//   }
// });

// document.addEventListener("input", function (event) {
//   if (event.target.tagName === "INPUT") {
//     totalPrice.innerHTML = event.target.value;
//     console.log(event.target.value);
//   }
// });
