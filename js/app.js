// const menuDiv = document.getElementById("menu");

// function display(items) {
//   if (!menuDiv) {
//     console.error("menuDiv not found!");
//     return;
//   }

//   menuDiv.innerHTML = "";

//   items.forEach(item => {
//     menuDiv.innerHTML += `
//       <div class="card">
//         <img src="${item.img}">
//         <div class="card-body">
//           <h4>${item.name}</h4>
//           <p>${item.category}</p>
//           <p>₹${item.price}</p>
//           <button onclick='addToCart(${JSON.stringify(item)})'>Add</button>
//         </div>
//       </div>
//     `;
//   });
// }

// function filterMenu(category) {
//   if (category === "All") {
//     display(menu);
//   } else {
//     let filtered = menu.filter(item => item.category === category);
//     display(filtered);
//   }
// }
// function addToCart(item) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   let exist = cart.find(i => i.id === item.id);

//   if (exist) {
//     exist.qty += 1;
//   } else {
//     item.qty = 1;
//     cart.push(item);
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));

//   updateCartUI(); // 🔥 update instantly
// }
// function updateCartUI() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   let cartItems = document.getElementById("cartItems");
//   let totalDiv = document.getElementById("total");

//   if (!cartItems) return;

// cartItems.innerHTML += `
//   <div style="display:flex; justify-content:space-between; align-items:center;">
//     <span>${item.name}</span>

//     <div>
//       <button onclick="changeQty(${index}, -1)">-</button>
//       ${item.qty}
//       <button onclick="changeQty(${index}, 1)">+</button>
//     </div>

//     <span>₹${item.price * item.qty}</span>
//   </div>
// `;


//   totalDiv.innerText = "Total: ₹" + total;
// }


// // load default
// // display(menu);
// updateCartUI(); // 🔥 important

// display(menu);

// 1. Get menu div
const menuDiv = document.getElementById("menu");

// 2. Display menu
function display(items) {
  menuDiv.innerHTML = "";

  items.forEach(item => {
    menuDiv.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <div class="card-body">
          <h4>${item.name}</h4>
          <p>${item.category}</p>
          <p>₹${item.price}</p>
          <button onclick='addToCart(${JSON.stringify(item)})'>Add</button>
        </div>
      </div>
    `;
  });
}

// 3. Add to cart
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let exist = cart.find(i => i.id === item.id);

  if (exist) {
    exist.qty += 1;
  } else {
    item.qty = 1;
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartUI(); // 🔥 update instantly
}

// 4. 🔥 ADD THIS HERE (IMPORTANT)
function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// 5. Update cart UI
function updateCartUI() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cartItems");
  let totalDiv = document.getElementById("total");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span>${item.name}</span>

        <div>
          <button onclick="changeQty(${index}, -1)">-</button>
          ${item.qty}
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <span>₹${item.price * item.qty}</span>
      </div>
    `;
  });

  totalDiv.innerText = "Total: ₹" + total;
}

// 6. Filter
function filterMenu(category) {
  if (category === "All") {
    display(menu);
  } else {
    let filtered = menu.filter(item => item.category === category);
    display(filtered);
  }
}

// 7. Load page
display(menu);
updateCartUI();


