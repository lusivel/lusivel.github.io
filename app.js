document.addEventListener("alpine:init", () => {
  Alpine.data("menu", () => ({
    items: [
      { id: 1, name: "Chicken with Golden Sauce", img: "1.jpg", price: 250000 },
      { id: 2, name: "Classic Tomahawk", img: "2.jpg", price: 450000 },
      { id: 3, name: "Tenderloin steak", img: "3.jpg", price: 400000 },
      {
        id: 4,
        name: "Golden salmon with vegetables",
        img: "4.jpg",
        price: 200000,
      },
      {
        id: 5,
        name: "Classic Brown Sugar Pound Cake",
        img: "5.jpg",
        price: 100000,
      },
      { id: 6, name: "Steak with Golden Chicken", img: "6.jpg", price: 500000 },
      { id: 7, name: "Chicken Breast Pieces", img: "7.jpg", price: 150000 },
      {
        id: 8,
        name: "T-Bone with the vibrant flavors",
        img: "8.jpg",
        price: 350000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      let existingItem = this.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...newItem, quantity: 1 });
      }
      this.updateCart();
    },
    increaseQuantity(index) {
      this.items[index].quantity++;
      this.updateCart();
    },
    decreaseQuantity(index) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity--;
      } else {
        this.items.splice(index, 1);
      }
      this.updateCart();
    },
    updateCart() {
      this.total = this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      this.quantity = this.items.reduce(
        (quantity, item) => quantity + item.quantity,
        0
      );
      console.log(`Total Price: Rp ${this.total.toLocaleString("id-ID")}`);
      console.log(`Total Quantity: ${this.quantity}`);
    },
  });
});

// form validation

const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  let isValid = true;
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value === "") {
      isValid = false;
      break;
    }
  }
  if (isValid) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove("disabled");
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add("disabled");
  }
});
