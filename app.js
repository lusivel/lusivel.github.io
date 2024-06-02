// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("input", function () {
  let isValid = true;
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];
    if (
      (element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT") &&
      element.type !== "hidden" &&
      element.value.trim() === ""
    ) {
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

// Function to handle queue
const handleQueue = () => {
  let queueNumber = localStorage.getItem("queueNumber") || 0;
  queueNumber++;
  localStorage.setItem("queueNumber", queueNumber);
  document.getElementById("queue").textContent = queueNumber;
  document.getElementById("checkoutForm").style.display = "none";
  document.getElementById("queueNumber").style.display = "block";
};

// kirim data ketika checkout di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);

  // Mengambil data dari Alpine store
  const cart = Alpine.store("cart");
  const items = cart.items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    total: item.price * item.quantity,
  }));
  objData.items = JSON.stringify(items);
  objData.total = cart.total;

  const message = formatMessage(objData);
  const whatsappUrl = `https://wa.me/6289604464167?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl);

  // Handle queue number display
  handleQueue();
});

// Function to format the WhatsApp message
const formatMessage = (obj) => {
  let items;
  try {
    items = JSON.parse(obj.items);
    if (!Array.isArray(items)) {
      throw new Error("Items is not an array");
    }
  } catch (e) {
    console.error("Failed to parse items:", e);
    return "Invalid items data";
  }

  const formattedItems = items
    .map((item) => {
      const itemName = item.name;
      const itemQuantity = item.quantity;
      const itemTotal = rupiah(item.total);
      return `${itemName} (${itemQuantity} x ${itemTotal})`;
    })
    .join("\n");

  const customerName = obj.name;
  const customerEmail = obj.email;
  const customerPhone = obj.phone;

  const total = rupiah(Number(obj.total));

  return `Data Customer
Nama: ${customerName}
Email: ${customerEmail}
No Hp: ${customerPhone}

Data Pesanan
${formattedItems}

TOTAL: ${total}
Terima Kasih.`;
};

// Function to format number to Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

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
