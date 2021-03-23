
	const headingEl = document.querySelector("#output");
	const primarytext = document.querySelector("#primarynumber");	
	const description = document.querySelector("#primaryDesc");
	const showData = document.querySelector("#putData");
	const element = document.querySelector("#add");
	// document is our whole page which we are viewing and query selector is used to fetch the button which has id as add. we use # in Js for id's just like we use . in css for classes. element is a variable used to store the information of thetag related to mentioned id (in this case the button statement is stored under element. In JS ES6 there are only two datatypes for variables i.e. const and let.
	element.addEventListener("click", addition, false); 
	//add event listener will add a functionality to our element i.e. button of click so whenever a click is encountered it will make a call to function addition
	if(localStorage.getItem('data')!== null) {
		processing();
	}
	let base = 0;
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
		console.log(allinfo);
		allinfo.push(currentEl);
		localStorage.setItem('data',JSON.stringify(allinfo));
		document.expenseInputForm.reset();	// to clear the input form after one successful submit iteration		
		const primarynum = parseInt(currentEl.rupees, 10);
		base = base + primarynum;
		// const showResult = `the overall expense you spent is ${base}`
		headingEl.textContent = base;
		processing();
	}

	function processing() {
		const array = JSON.parse(localStorage.getItem('data'));
		console.log(array);
		// first convert string to Date then send to createItemList (3rd parameter)
		const allinfoHTML = array.map(expense => createItemList(expense.description, expense.rupees,new Date(expense.thismoment)));
		console.log(allinfoHTML);
		const joinedallinfoHTML = allinfoHTML.join("");
		console.log(joinedallinfoHTML);
		showData.innerHTML = joinedallinfoHTML;
	}

		function createItemList( description, rupees, thismoment) {
			console.log(thismoment);
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

		function deleteItemFromTotal( Item ) {
			base = base - Item.rupees;
			headingEl.textContent = base;
		}
		function deleteItem(timeCreated ) {
				
			// For deleting item in original array
			for (var i = 0; i < allinfo.length; i++) {
				if (allinfo[i].thismoment.valueOf() == timeCreated ) {
					deleteItemFromTotal(allinfo[i]);
					for( var k=i; k < allinfo.length - 1; k++) {
						allinfo[k] = allinfo[k+1];
					}
					allinfo.pop();
				}
			}

			// FOR MAKING A NEW ARRAY WITH DELETED element
			// 	const updatedListAfterDeletion = [];
			// 		if (allinfo[i].thismoment.valueOf() !== timeCreated) {
			// 			updatedListAfterDeletion.push(allinfo[i]);
			//  		console.log('Item found', allinfo[i].description);
			// 		}					

			// 	 FOR MAKING A NEW ARRAY WITH DELETED element with .filter
			// 	 const updatedListAfterDeletion = allinfo.filter(expense => { expense.thismoment.valueOf() !== timeCreated});
				renderList(allinfo);
		}

		function renderList(updatedListAfterDeletion ) {
			const allinfoHTML = updatedListAfterDeletion.map(expense => createItemList(expense.description, expense.rupees, expense.thismoment));
			const joinedallinfoHTML = allinfoHTML.join("");
			showData.innerHTML = joinedallinfoHTML;
		}
		function getDateString(moment) {
			var options = { year: 'numeric', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', seconds: '2-digit'};
			return moment.toLocaleDateString('en-US', options);
		}

