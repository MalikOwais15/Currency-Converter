const BASE_URL =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

const dropdowns = document.querySelectorAll('.dropdown select');
let btn = document.querySelector('form button');
let icon = document.querySelector('.icon');
const fromCurr = document.querySelector('#from');
const toCurr = document.querySelector('#to');
const msg = document.querySelector('.msg');
let amount = document.querySelector('.amount input');

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement('option');
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === 'from' && currCode === 'USD') {
      newOption.selected = 'selected';
    } else if (select.name === 'to' && currCode === 'PKR') {
      newOption.selected = 'selected';
    }
    select.append(newOption);
  }
  select.addEventListener('change', (evt) => {
    updateFlag(evt.target);
  });
}

let toggle = () => {
  let fromSelect = document.querySelector('.dropdown select[name="from"]');
  let toSelect = document.querySelector('.dropdown select[name="to"]');
  let temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  updateFlag(fromSelect);
  updateFlag(toSelect);
};
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;
};
icon.addEventListener('click', () => {
  icon.style.animation = 'none';
  icon.offsetHeight;
  icon.style.animation = `spin 0.3s 1 forwards`;
  toggle();
  updateExchangeRate();
});

let updateExchangeRate = async () => {
  let amtVal = amount.value;
  if (amtVal === '' || amtVal < 1) {
    amtVal = 1;
    amount.value = amtVal;
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate =
    data[`${fromCurr.value.toLowerCase()}`][toCurr.value.toLowerCase()];
  let finalAmount = rate * amtVal;
  msg.innerText = `${amtVal}${fromCurr.value.toUpperCase()} = ${finalAmount}${toCurr.value.toUpperCase()}`;

  //   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
  //   const pkr = await fetch(URL)
  //     .then((response) => response.json())
  //     // .then((data) => data[`${fromCurr.value.toLowerCase()}`].`${value}`); // Use `value` directly here//-
  //     .then(
  //       (data) =>
  //         data[`${fromCurr.value.toLowerCase()}`][toCurr.value.toLowerCase()]
  //     ); // Fixed: Use `value` directly here//+
  //   console.log(pkr);
};

btn.addEventListener('click', (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
