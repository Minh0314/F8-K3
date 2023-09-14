// localStorage.setItem('name','minh');
// localStorage.setItem('age',19);
// console.log(localStorage.getItem('name'));
// // localStorage.removeItem('name')
// localStorage.clear();
var productTable = document.querySelector(".product_table");
var btnAdd = productTable.querySelectorAll("button");
var cartData = document.querySelector(".cart_data");

// 
// Lắng nghe sự kiện click trên các nút "Thêm vào giỏ"
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll("[id^='add_to_cart_']");

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Lấy thông tin sản phẩm từ thuộc tính data
      const productId = button.getAttribute("data-product-id");
      const productName = button.getAttribute("data-product-name");
      const productPrice = button.getAttribute("data-product-price");

    
      const quantityInput = document.getElementById(`quantity_${productId}`);
      const quantity = parseInt(quantityInput.value);

      const totalPrice = productPrice * quantity;

     
      const cartTable = document.querySelector(".cart");
      const newRow = cartTable.insertRow(-1); // Chèn vào cuối bảng
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);
      const cell4 = newRow.insertCell(3);
      const cell5 = newRow.insertCell(4);
      const cell6 = newRow.insertCell(5);

      cell1.innerHTML = cartTable.rows.length - 2; // STT
      cell2.innerHTML = productName; // Tên sản phẩm
      cell3.innerHTML = productPrice; // Giá
      cell4.innerHTML = quantity; // Số lượng
      cell5.innerHTML = totalPrice; // Thành tiền
      cell6.innerHTML = '<button type="button" class="remove-button">Xóa</button>';

   
      updateCartTotal();

      
      button.disabled = true;

      // Lắng nghe sự kiện click trên nút "Xóa"
      const removeButton = cell6.querySelector(".remove-button");
      removeButton.addEventListener("click", function () {
        newRow.remove(); // Xóa hàng khỏi giỏ hàng
        button.disabled = false; 
        updateCartTotal();
      });
    });
  });

  
  function updateCartTotal() {
    const cartTable = document.querySelector(".cart");
    const totalQuantityCell = cartTable.rows[cartTable.rows.length - 1].cells[3];
    const totalPriceCell = cartTable.rows[cartTable.rows.length - 1].cells[4];

    let totalQuantity = 0;
    let totalPrice = 0;

    for (let i = 1; i < cartTable.rows.length - 1; i++) {
      totalQuantity += parseInt(cartTable.rows[i].cells[3].innerHTML);
      totalPrice += parseFloat(cartTable.rows[i].cells[4].innerHTML);
    }

    totalQuantityCell.innerHTML = totalQuantity;
    totalPriceCell.innerHTML = totalPrice;
  }
});
