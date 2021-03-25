
	const headingEl = document.querySelector("#output");
	const primarytext = document.querySelector("#primarynumber");	
	const description = document.querySelector("#primaryDesc");
	const showData = document.querySelector("#putData");
	const element = document.querySelector("#add");
	element.addEventListener("click", addition, false); 
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
					<li class="list-group-item d-flex justify-content-between" bg-light>
						<div class="d-flex flex-column">
							${description}
							<small class"text-muted">${getDateString(thismoment)}
								</small>
						</div>
						<div>
							<span class="px-5">
								${rupees}
							</span>
							<button 
                                    type="button" 
                                    onclick="deleteItem(${thismoment.valueOf()})"
                                    class="btn btn-outline-danger btn-sm">	
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
