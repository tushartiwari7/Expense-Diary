	const headingEl = document.querySelector("#output");
	const primarytext = document.querySelector("#primarynumber");	
	const description = document.querySelector("#primaryDesc");
	const showData = document.querySelector("#putData");
	// const element = document.querySelector("#add");
	const expense = document.getElementById('expense');
	// Example starter JavaScript for disabling form submissions if there are invalid fields
	(function () {
		'use strict'
	
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.querySelectorAll('.needs-validation')
	
		// Loop over them and prevent submission
		Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
			if (!form.checkValidity()) {
				event.preventDefault()
				event.stopPropagation()
			}
	
			form.classList.add('was-validated')
			}, false)
		})
	})()
	// element.addEventListener("click", addition, false); 
	expense.onsubmit = addition;
	if(localStorage.getItem('data')!== null) {
		processing();
	}
		if(localStorage.getItem('bill')!== null){
			headingEl.textContent = localStorage.getItem('bill');
		}
		else {
			headingEl.textContent = 0;
		}
	let allinfo = [];
	function addition() {
		const currentEl = {};
		const temptext = primarytext.value;
		const textDesc = description.value;
		
		currentEl.description = textDesc;
		currentEl.rupees = temptext;
		const currenttime = new Date();
		currentEl.thismoment = currenttime;
		if(localStorage.getItem('data')!== null) {
			allinfo=JSON.parse(localStorage.getItem('data'));
		}
		allinfo.push(currentEl);
		localStorage.setItem('data',JSON.stringify(allinfo));
		document.expenseInputForm.reset();	// to clear the input form after one successful submit iteration		
		addToBill(currentEl.rupees);
		processing();
	}
function addToBill(price) {
	const primarynum = parseInt(price, 10);
	var billValue = JSON.parse(localStorage.getItem('bill'));
	billValue = billValue + primarynum;
	console.log(billValue);
	localStorage.setItem('bill',JSON.stringify(billValue));
	headingEl.textContent = billValue;
}

function deleteFromBill( price ) {
	var billValue = JSON.parse(localStorage.getItem('bill'));
	billValue = billValue - price;
	localStorage.setItem('bill',JSON.stringify(billValue));
	headingEl.textContent = billValue;
}
function processing() {
	let arr = JSON.parse(localStorage.getItem('data'));
	const allinfoHTML = arr.map(expense => createItemList(expense.description, expense.rupees,new Date(expense.thismoment)));
	const joinedallinfoHTML = allinfoHTML.join("");
	showData.innerHTML = joinedallinfoHTML;
}

		function createItemList( description, rupees, thismoment) {
			return `
					<li class="list-group-item justify-content-between d-flex h10 " bg-light>
						<div class="d-flex flex-column">
							<strong>${description}</strong>
							<small class"text-muted">${getDateString(thismoment)}</small>
						</div>
						<div class="row justify-content-evenly">
						<div class="input-group input-group-sm verticallyCenter  mb-3 w-25">
							<div class="input-group-prepend">
								<button type="button" class="btn btn-secondary">-</button>
							</div>
							<input type="number" value="0" class="form-control mw-25 counterInput" aria-label="Amount (to the nearest dollar)" />
							<div class="input-group-append">
  								<button type="button" class="btn btn-secondary">+</button>
							</div>
						</div>
						<span class="px-5 verticallyCenter">
						<strong>${rupees}</strong>
						</span>
						<button 
							type="button" 
							onclick="deleteItem(${thismoment.valueOf()})"
							class="btn btn-outline-danger">	
							<i class="fas fa-trash-alt"></i>
						</button>
						</div>
					</li>
				`;
		}	

		function deleteItem(timeCreated ) {
			let arr = JSON.parse(localStorage.getItem('data'));
			arr.forEach(
				element =>{
					var fetchedTime = new Date(element.thismoment);
					var fetchedTimeVal = fetchedTime.valueOf();
					if(fetchedTimeVal === timeCreated) {
						deleteFromBill(element.rupees);
						const indexOfDelEl = arr.indexOf(element);
						arr.splice(indexOfDelEl,1);
					}
				}
			);
			localStorage.setItem('data',JSON.stringify(arr));
			renderList(arr);
		}

		function renderList(updatedListAfterDeletion ) {
			const allinfoHTML = updatedListAfterDeletion.map(expense => createItemList(expense.description, expense.rupees, new Date(expense.thismoment)));
			const joinedallinfoHTML = allinfoHTML.join("");
			showData.innerHTML = joinedallinfoHTML;
		}
		function getDateString(moment) {
			var options = { year: 'numeric', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', seconds: '2-digit'};
			return moment.toLocaleDateString('en-US', options);
		}
