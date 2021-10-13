const addToShoppingCartButtons = document.querySelectorAll(".añadirCarrito");
addToShoppingCartButtons.forEach((añadirCarritoButton) => {
  añadirCarritoButton.addEventListener("click", añadirCarritoClicked);
});

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);

const shoppingCartcriptosContainer = document.querySelector(
  ".shoppingCartcriptosContainer"
);

function añadirCarritoClicked(event) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Listo, se añadió la cripto a tu carrito!',
    showConfirmButton: false,
    timer: 600
  });
  const button = event.target;
  const cripto = button.closest(".cripto");

  const criptoTitle = cripto.querySelector(".criptoTitulos").textContent;
  const criptoPrice = cripto.querySelector(".criptoPrecio").textContent;

  addcriptoToShoppingCart(criptoTitle, criptoPrice);
}

function addcriptoToShoppingCart(criptoTitle, criptoPrice) {
  const elementsTitle = shoppingCartcriptosContainer.getElementsByClassName(
    "shoppingCartcriptoTitle"
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === criptoTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".carritoCriptosAdd"
      );
      elementQuantity.value++;
      $(".toast").toast("show");
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement("div");
  const shoppingCartContent = `
  <div class="row shoppingCartcripto">
        <div class="col-6">
            <div class="shopping-cart-cripto d-flex align-criptos-center h-100 border-bottom pb-2 pt-3">
                <h6 class="carritoTituloCriptos shoppingCartcriptoTitle text-truncate ml-3 mb-0">${criptoTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-criptos-center h-100 border-bottom pb-2 pt-3">
                <p class="criptoPrecio mb-0 carritoCriptoPrecio">${criptoPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-criptos-center h-100 border-bottom pb-2 pt-3">
                <input class="carritoCantidad carritoCriptosAdd" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartcriptosContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCartcripto);

  shoppingCartRow
    .querySelector(".carritoCriptosAdd")
    .addEventListener("change", quantityChanged);
  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartcriptos = document.querySelectorAll(".shoppingCartcripto");

  shoppingCartcriptos.forEach((shoppingCartcripto) => {
    const carritoCriptoPrecioElement = shoppingCartcripto.querySelector(
      ".carritoCriptoPrecio"
    );
    const carritoCriptoPrecio = Number(
      carritoCriptoPrecioElement.textContent.replace("usd$", "")
    );
    const carritoCriptosAddElement = shoppingCartcripto.querySelector(
      ".carritoCriptosAdd"
    );
    const carritoCriptosAdd = Number(
      carritoCriptosAddElement.value
    );
     total = total + carritoCriptoPrecio * carritoCriptosAdd;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}usd$`;
}

function removeShoppingCartcripto(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".shoppingCartcripto").remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartcriptosContainer.innerHTML = "";
  updateShoppingCartTotal();
  Swal.fire({
    title: "Estás seguro de tu compra?",
    text: "No te olvides de revisar tus datos!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Bien!", "Su compra se realizó con exito!", "success");
    } else {
      Swal.fire("Listo", "Esperamos su compra!", "info");
    }
  });
}
