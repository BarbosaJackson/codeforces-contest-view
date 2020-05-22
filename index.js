window.onload = setTimeout(getContests('contest.list', createTable), 3000);

function createTable(data) {
	var stringTable = `<table id = 'mytable' class="table table-bordered">
	<thead>
	<tr>
	<th>idx</th>
	<th>Nome</th>
	<th>tempo</th>
	</tr>
	</thead>
	<tbody>`
	var qnt = data['result'].length;
	var lines = 0;
	for(let i = 0; i < qnt; i += 1) {
		if(data['result'][i]['phase'] != "FINISHED") {
			console.log('contest/' + data['result'][i]['id'], 'contest/' + data['result'][i]['id'] in localStorage);
			if('contest/' + data['result'][i]['id'] in localStorage) {
				const startTimeSeconds = data['result'][i]['relativeTimeSeconds'] * -1;
				var days = Math.floor(startTimeSeconds / (60 * 60 * 24));
				var hours = Math.floor((startTimeSeconds - (days * 60 * 60 * 24)) / (60 * 60));
				var min = Math.floor((startTimeSeconds - (days * 60 * 60 * 24) - (hours * 3600)) / 60);
				stringTable += `<tr><td>${lines + 1}</td>
				<td>
				<a href='https://codeforces.com/contests/${data['result'][i]['id']}' target="_blank">${data['result'][i]['name']}</a>
				</td>
				<td>${days} dias ${hours}:${min}</td>
				</tr>`;
				lines += 1;
			}
		}
	}
	stringTable += "</tbody></table>"
	if(lines == 0) {
		document.getElementById('noContest').innerHTML = "Nenhum contest cadastrado";
	} else {
		document.getElementById('mytable').innerHTML = stringTable;
	}
}