

function createTable(data) {
	var divs = [];
	if(document.getElementById('div1').checked) {
		divs.push(`Div. 1`);
	}
	if(document.getElementById('div2').checked) {
		divs.push(`Div. 2`);
	}
	if(document.getElementById('div3').checked) {
		divs.push(`Div. 3`);
	}
	if(document.getElementById('div4').checked) {
		divs.push(`Div. 4`);
	}
	var stringTable = `<table border='1px'>
	<thead>
	<tr>
	<th>idx</th>
	<th>Nome</th>
	<th>tempo</th>
	<th>Salvar</th>
	</tr>
	</thead>
	<tbody>`
	var qnt = data['result'].length;
	var lines = 0;
	for(let i = 0; i < qnt; i += 1) {
		if('contest/' + data['result'][i]['id'] in localStorage) {
			continue;
		}
		for(let j = 0; j < divs.length; j += 1) {
			if(data['result'][i]['name'].search(divs[j]) != -1 && data['result'][i]['phase'] != "FINISHED") {
				const startTimeSeconds = data['result'][i]['relativeTimeSeconds'] * -1;
				var days = Math.floor(startTimeSeconds / (60 * 60 * 24));
				var hours = Math.floor((startTimeSeconds - (days * 60 * 60 * 24)) / (60 * 60));
				var min = Math.floor((startTimeSeconds - (days * 60 * 60 * 24) - (hours * 3600)) / 60);
				stringTable += `<tr><td>${lines + 1}</td>
				<td>
				<a href='https://codeforces.com/contests/${data['result'][i]['id']}' target="_blank">${data['result'][i]['name']}</a>
				</td>
				<td>${days} dias ${hours}:${min}</td>
				<td><input type="checkbox" id='contest/${data['result'][i]['id']}' id='radio'></td>
				</tr>`;
				lines += 1;
				break;
			}
		}
	}
	stringTable += "</tbody></table>"
	if(lines == 0) {
		document.getElementById('noContest').innerHTML = "Sem contests no momento";
	} else {
		document.getElementById('mytable').innerHTML = stringTable;
	}
}

function save() {
	var table = $('#mytable');
	table.find('tr').each(function(idx) {
		var cell = $(this)[0]['cells'][3]['childNodes'];
		console.log(cell);
		if('type' in cell[0] && cell[0]['type'] == 'checkbox' && cell[0]['checked']) {
			var id = cell[0]['id'];
			for(var i = 0; i < id.length; i += 1) {
				if(id[i] == '#') {
					i+=1;
					break;
				}
			}
			localStorage.setItem(cell[0]['id'], id);
		}
	});
}