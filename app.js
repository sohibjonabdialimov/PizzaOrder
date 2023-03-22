const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const form = document.getElementById("form");
const editForm = document.getElementById("editForm");
const close = document.getElementById("close");
const edit = document.getElementById("edit");
const username = document.getElementById("username");
const editUsername = document.getElementById("editUsername");
const phoneNumber = document.getElementById("phoneNumber");
const editPhoneNumber = document.getElementById("editPhoneNumber");
const address = document.getElementById("address");
const editAddress = document.getElementById("editAddress");
const pizzaSize = document.querySelectorAll(".pizzaSize");
let pizzaSize1 = document.querySelectorAll(".pizzaSize1");
const productsCheck = document.querySelectorAll(".products-check");
const productsCheck1 = document.querySelectorAll(".products-check1");
const extraCheck = document.querySelectorAll(".extra-check");
const extraCheck1 = document.querySelectorAll(".extra-check1");
const thickness = document.querySelector("#thickness");
const editThickness = document.querySelector("#editThickness");
const menuPizza = document.querySelector(".menuPizza");
let pizzaSizeValue = "25sm";
let pizzaEditSizeValue;
let pizzaProductsArray = [];
let overallPizzas = [];
let pizzaCheckbox = [];
let pizzaEditCheckbox = [];
let pizzaExtraCheckbox = [];
let pizzaEditExtraCheckbox = [];

let globalValues;
let thicknessPrice = {
  none: 0,
  Thin: 10,
  Medium: 12,
  Thick: 15
}

let pizzaSizePrice = {
  "25sm": 10,
  "30sm": 12,
  "35sm": 15
}

function menuListAdd(e) {
  e.preventDefault();
  let orderPizza = {
    id: +Math.random().toFixed(3),
    username: username.value,
    phoneNumber: phoneNumber.value,
    address: address.value,
    thickness: thickness.value,
    pizzaSizeValue: pizzaSizeValue,
    pizzaCheckbox,
    pizzaExtraCheckbox,
    onTotal: (thicknessPrice[thickness.value] ? thicknessPrice[thickness.value] : 0) + (pizzaSizePrice[pizzaSizeValue] ? pizzaSizePrice[pizzaSizeValue] : 0) + (pizzaCheckbox.length * 5) + (pizzaExtraCheckbox.length * 3),
  }

  overallPizzas.push(orderPizza);
  renderHtmlElement();
}




function renderHtmlElement() {
  let result = overallPizzas.map((pizzaItem, index) => {
    let elements = `
    <div class="menu-content" id="menuContent">
      <div class="modal-info">
        <h1>Order: ${index + 1}</h1>
        <div class="form-info">
          <p><span>Name: </span> ${pizzaItem.username}</p>
          <p><span>Phone: </span> ${pizzaItem.phoneNumber}</p>
          <p><span>Address: </span> ${pizzaItem.address}</p>
        </div>
      </div>
      <div class="pizza-info">
        <p><span>Dough thickness: </span> ${pizzaItem.thickness}</p>
        <p><span>Size: </span> ${pizzaItem.pizzaSizeValue}</p>
        <p><span>On Pizza: </span> ${pizzaItem.pizzaCheckbox.join(', ')}</p>
        <p><span>Add: </span> ${pizzaItem.pizzaExtraCheckbox.join(', ')}</p>
      </div>
      <div class="total">
        <h3>Total:  <span>$${pizzaItem.onTotal}</span></h3>
      </div>
      <div class="images">
        <img src="img/delete.png" onclick="deleteElement(${pizzaItem.id})" id="close" alt="">
        <img src="img/edit.png" onclick="editElement(${pizzaItem.id})" id="edit" alt="">
      </div>
    </div>
    `
    return elements;
  }).join(' ');

  menuPizza.innerHTML = result;
  pizzaCheckbox = [];
  pizzaExtraCheckbox = [];

  productsCheck.forEach((item) => {
    if (item.checked) {
      item.checked = false;
    };
  });
  productsCheck1.forEach((item) => {
    if (item.checked) {
      item.checked = false;
    };
  });

  extraCheck.forEach((item) => {
    if (item.checked) {
      item.checked = false;
    };
  });
  extraCheck1.forEach((item) => {
    if (item.checked) {
      item.checked = false;
    };
  });
};

function deleteElement(id) {
  overallPizzas = overallPizzas.filter((item) => {
    console.log(item.id, id);
    return item.id !== id;
  })
  renderHtmlElement();
};


function editElement(id) {
  modal.style.display = 'flex';

  let findedElement = overallPizzas.find((item) => item.id === id);
  let findedElementIndex = overallPizzas.findIndex((item) => item.id === id);

  globalValues = {
    id: id,
    index: findedElementIndex
  }
  editUsername.value = findedElement.username;
  editPhoneNumber.value = findedElement.phoneNumber;
  editAddress.value = findedElement.address;
  editThickness.value = findedElement.thickness;
  pizzaEditSizeValue = findedElement.pizzaSizeValue;
  pizzaEditCheckbox = findedElement.pizzaCheckbox;
  pizzaEditExtraCheckbox = findedElement.pizzaExtraCheckbox;


  let editPizzaSize = Array.from(pizzaSize1).find((item) => {
    Array.from(pizzaSize1).forEach(it => {
      it.classList.remove('active');
    })

    return item.dataset.id === findedElement.pizzaSizeValue;
  });
  editPizzaSize.classList.add('active');



  findedElement.pizzaCheckbox.forEach((item) => {
    let productCheckElement = Array.from(productsCheck1).find(it => {
      return it.value === item;
    });
    productCheckElement.checked = true;
  })
  findedElement.pizzaExtraCheckbox.forEach((item) => {
    let productExtraCheckElement = Array.from(extraCheck1).find(it => {
      return it.value === item;
    });
    productExtraCheckElement.checked = true;
  });

};



modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.id === "close") {
    modal.style.display = "none";
  }
})

productsCheck.forEach((item) => {
  item.addEventListener('change', (e) => {
    if (pizzaCheckbox.includes(e.target.value)) {
      pizzaCheckbox = pizzaCheckbox.filter((el) => el !== e.target.value)
    } else {
      pizzaCheckbox.push(e.target.value)
    }
  })
});
productsCheck1.forEach((item) => {
  item.addEventListener('change', (e) => {
    if (pizzaEditCheckbox.includes(e.target.value)) {
      pizzaEditCheckbox = pizzaEditCheckbox.filter((el) => el !== e.target.value)
    } else {
      pizzaEditCheckbox.push(e.target.value);
    }
  })
});

extraCheck.forEach((item) => {
  item.addEventListener('change', (e) => {
    if (pizzaExtraCheckbox.includes(e.target.value)) {
      pizzaExtraCheckbox = pizzaExtraCheckbox.filter((el) => el !== e.target.value)
    } else {
      pizzaExtraCheckbox.push(e.target.value);
    }
  })
})
extraCheck1.forEach((item) => {
  item.addEventListener('change', (e) => {
    if (pizzaEditExtraCheckbox.includes(e.target.value)) {
      pizzaEditExtraCheckbox = pizzaEditExtraCheckbox.filter((el) => el !== e.target.value)
    } else {
      pizzaEditExtraCheckbox.push(e.target.value);
    }
  })
})

pizzaSize.forEach((item) => {
  item.addEventListener("click", (e) => {
    pizzaSize.forEach((item) => {
      item.classList.remove("active");
    })
    e.target.classList.add("active");
    pizzaSizeValue = e.target.id;
  })
})
pizzaSize1.forEach((item) => {
  item.addEventListener("click", (e) => {
    pizzaSize1.forEach((item) => {
      item.classList.remove("active");
    })
    e.target.classList.add("active");
    pizzaEditSizeValue = e.target.dataset.id;
  })
})




editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  modal.style.display = 'none';


  let newOrderPizza = {
    id: globalValues.id,
    username: editUsername.value,
    phoneNumber: editPhoneNumber.value,
    address: editAddress.value,
    thickness: editThickness.value,
    pizzaSizeValue: pizzaEditSizeValue,
    pizzaCheckbox: pizzaEditCheckbox,
    pizzaExtraCheckbox: pizzaEditExtraCheckbox,
    onTotal: thicknessPrice[editThickness.value] + pizzaSizePrice[pizzaEditSizeValue] + (pizzaEditCheckbox.length * 5) + (pizzaEditExtraCheckbox.length * 3),
  }

  overallPizzas.splice(globalValues.index, 1, newOrderPizza);
  renderHtmlElement();
  console.log(newOrderPizza);
});

form.addEventListener("submit", menuListAdd);