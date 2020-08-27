addTodoFn = () =>{
	let frm = document.querySelector('form');
	let txt = document.querySelector('#todoInput').value;
	if(txt=='')
		return;
	functions.setData(txt);
	document.querySelector('#todoInput').value='';
}	

delTodoFn = (e) =>{
	let id = e.parentElement.getAttribute('data-id');
	functions.delData(id);
	e.parentElement.remove();
}
complTodoFn=(e)=>{
	let id = e.parentElement.getAttribute('data-id');
	functions.compData(id);
	e.classList.add('s-thru');
}

const functions = {
	getLocal : () => {
		let dta = localStorage.getItem('todo');
		if(dta==null)
			return {};
		else
			return JSON.parse(dta);
	},
	setData : (value) => {
		let dta = functions.getLocal();
		let tmp = {'txt':value,'comp':'N'};
		let mxVal=Object.keys(dta).sort().reverse()[0];
		if(mxVal==undefined)
			mxVal=0;
		dta[parseInt(mxVal)+1]=tmp;
		localStorage.setItem('todo',JSON.stringify(dta));
		functions.dispData();
	},
	dispData : () => {
		let dta = functions.getLocal();
		document.querySelector('.todo-list').innerHTML='';
		for(let t in dta){
			let ptype = document.querySelector('.prtype').cloneNode(true);
			ptype.classList.remove('prtype');
			ptype.classList.remove('none');
			ptype.querySelector('p').innerHTML= dta[t].txt;
			if(dta[t].comp=='Y')
				ptype.querySelector('p').classList.add('s-thru');
			ptype.setAttribute('data-id',t);
			document.querySelector('.todo-list').appendChild(ptype);
			console.log(t,dta[t]);
		}
	},
	delData : (key) => {
		let dta = functions.getLocal();
		delete dta[key];
		localStorage.setItem('todo',JSON.stringify(dta));
	},
	compData : (key) => {
		let dta = functions.getLocal();
		dta[key].comp='Y';
		localStorage.setItem('todo',JSON.stringify(dta));
	}
}

window.onload = function(){
	functions.dispData();
	functions.delData('2');
}