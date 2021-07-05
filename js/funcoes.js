
$(document).ready(function() {
	return Listar()
} );

function mascaraQuantidade(qtd){
	let p = $('#unidadeMedida').val()

	switch(p){
		case 'Litro':
			qtd.value = $('#quantidade').val() + ' lt'
			break
		case 'Quilograma':
			qtd.value = $('#quantidade').val() + ' kg'
			break
		case 'Unidade':
			qtd.value = $('#quantidade').val() + ' un'
			break
	}
}


function mascaraReal(i){
	let v = i.value.replace(/\D/g,'');
	v = (v/100).toFixed(2) + '';
	v = v.replace(".", ",");
	v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
	v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
	i.value = 'R$' +  v;
}

function liberarValidade(value){
	if(value == 'true'){
		document.getElementById('dataValidade').removeAttribute('disabled')
	}else{
		document.getElementById('dataValidade').setAttribute('disabled', "")
	}
}

function submitForm(){
	let nome = $('#nome').val()
	let undMedida = $('#unidadeMedida').val()
	let preco = $('#preco').val()
	let produtoPerecivel
	let dataValidade = $('#dataValidade').val()
	let dataFabricacao = $('#dataFabricacao').val()
	let ele = document.getElementsByName('produtoPerecivel')
	let diaI = new Date(dataFabricacao)
	let diaF = new Date(dataValidade)

	for(i = 0; i < ele.length; i++) {
		if(ele[i].checked) produtoPerecivel =	ele[i].value
	}
	if(nome && undMedida && preco && produtoPerecivel && dataFabricacao){
		if(diaF.getTime() < diaI.getTime()){
			alert('O produto se encontra vencido!')
		}else{
			return Adicionar()
		}

	}else{
		if(!nome){
			document.getElementById('alertNome').classList.remove('hide')
		}else{
			if(nome.length > 50){
				document.getElementById('alertCaracteres').classList.remove('hide')
			}
		}
		if(!undMedida){
			document.getElementById('alertUnidadeMedida').classList.remove('hide')
		}
		if(!preco){
			document.getElementById('alertPreco').classList.remove('hide')
		}
		if(!produtoPerecivel){
			document.getElementById('alertPerecivel').classList.remove('hide')
		}else{
			if(produtoPerecivel == 'true'){
				if(document.getElementById('dataValidade').getAttribute('disabled') == null){
					if(!dataValidade){
						document.getElementById('alertValidade').classList.remove('hide')
					}
				}
			}
		}
		if(!dataFabricacao){
			document.getElementById('alertFabricacao').classList.remove('hide')
		}
	}
	
}

function Adicionar(){
	var tbItens = localStorage.getItem("Itens");// Recupera os dados armazenados
	tbItens = JSON.parse(tbItens); // Converte string para objeto
	if(tbItens == null) // Caso não haja conteúdo, iniciamos um vetor vazio
	tbItens = [];
	let ele = document.getElementsByName('produtoPerecivel')
	for(i = 0; i < ele.length; i++) {
		if(ele[i].checked)
		produtoPerecivel = ele[i].value
	}
	var item = JSON.stringify({
		nome   : $("#nome").val(),
		unidadeMedida     : $("#unidadeMedida").val(),
		quantidade : $("#quantidade").val(),
		preco    : $("#preco").val(),
		perecivel : produtoPerecivel,
		dataValidade : $('#dataValidade').val(),
		dataFabricacao : $('#dataFabricacao').val()
	});
	tbItens.push(item);
	localStorage.setItem("Itens", JSON.stringify(tbItens));
	alert("Item adicionado.");
	return true;
}

function Listar(){
	let tbItens = localStorage.getItem("Itens");
	let itemT = JSON.parse(tbItens)

	for(let i = 0; i < itemT.length; i++){
		let dataFabricacao = new Date(itemT[i].split('"')[27])
		let dataValidade = new Date(itemT[i].split('"')[23])
		$('#tbody').append("<tr>")
		$('#tbody').append('<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formModal" class=\"btn btn-primary btnEditar" onclick="preencherFormulario('+ i +')"><svg xmlns="http:www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button><a href="listagem.html"><button class="btn btn-danger" onclick="excluir('+ i +')"><svg xmlns="http:www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button></a></td>')
		$('#tbody').append('<td>' + i + '</td>')
		$('#tbody').append('<td>' + itemT[i].split('"')[3] + '</td>')
		$('#tbody').append('<td>'+ itemT[i].split('"')[11] + '</td>')
		$('#tbody').append('<td>' + itemT[i].split('"')[15] + '</td>')
		$('#tbody').append('<td>' + dataFabricacao.getDate() + '/' + (dataFabricacao.getMonth() + 1) + '/' + dataFabricacao.getFullYear() + '</td>')
		if(itemT[i].split('"')[23]){
			$('#tbody').append('<td>' + (dataValidade.getDate()+ 1) + '/' + (dataValidade.getMonth() + 1) + '/' + dataValidade.getFullYear() + '</td></tr>')
		}		
		else{
			$('#tbody').append('<td>Item não perecível</td>')
		}

	}
}

function preencherFormulario(i){
	let tbItens = localStorage.getItem('Itens')
	let item = JSON.parse(tbItens)
	$('#nome').val(item[i].split('"')[3])
	if(item[i].split('"')[7] == 'Unidade'){
		$('#unidadeMedida').html( 
			'<option selected value="Unidade">Unidade</option>'+
			'<option value="Litro">Litro</option>'+
			'<option value="Quilograma">Quilograma</option>')
	}else if(item[i].split('"')[7] == 'Litro'){
		$('#unidadeMedida').html( 
			'<option value="Unidade">Unidade</option>'+
			'<option selected value="Litro">Litro</option>'+
			'<option value="Quilograma">Quilograma</option>'
		)
	}else{
		$('#unidadeMedida').html( 
			'<option value="Unidade">Unidade</option>'+
			'<option value="Litro">Litro</option>'+
			'<option selected value="Quilograma">Quilograma</option>'
		)
	}
	$('#quantidade').val(item[i].split('"')[11])
	$('#preco').val(item[i].split('"')[15])
	$('#dataValidade').val(item[i].split('"')[23])
	$('#dataFabricacao').val(item[i].split('"')[27])

	if(item[i].split('"')[19] == 'true'){
		$('#radioArea').html(
			'<label class="radio-inline"><input type="radio" value="true" id="produtoPerecivel" name="produtoPerecivel" onclick="liberarValidade(this.value)" checked>Sim</label>' +
			'<label class="radio-inline"><input type="radio" value="false" id="produtoPerecivel" name="produtoPerecivel" onclick="liberarValidade(this.value)">Não</label>'
		)
	}else{
		$('#radioArea').html(
			'<label class="radio-inline"><input type="radio" value="true" id="produtoPerecivel" name="produtoPerecivel" onclick="liberarValidade(this.value)">Sim</label>' +
			'<label class="radio-inline"><input type="radio" value="false" id="produtoPerecivel" name="produtoPerecivel" onclick="liberarValidade(this.value)"checked>Não</label>'
		)
	}

	$('#modalFooter').html(
		'<button type="submit" class="btn btn-danger" data-dismiss="modal">Fechar</button>'+
		'<a href="listagem.html"><button type="submit" class="btn btn-success" onclick="editar('+ i +')">Salvar</button></a>'
	)
}

function editar(pos){
	let tbItem = localStorage.getItem('Itens')

	let item = JSON.parse(tbItem)
	let ele = document.getElementsByName('produtoPerecivel')
	for(i = 0; i < ele.length; i++) {
		if(ele[i].checked)
		produtoPerecivel = ele[i].value
	}
    item[pos] = JSON.stringify({
		nome   : $("#nome").val(),
		unidadeMedida     : $("#unidadeMedida").val(),
		quantidade : $("#quantidade").val(),
		preco  : $("#preco").val(),
		perecivel : produtoPerecivel,
		dataValidade : $('#dataValidade').val(),
		dataFabricacao : $('#dataFabricacao').val()
        });
		localStorage.setItem('Itens', JSON.stringify(item))
    alert("Informações editadas.")
	return true;
}

function excluir(i){
	let tbItens = localStorage.getItem('Itens')
	let item = JSON.parse(tbItens)
	itemN = item.splice(i, 1)
	if(confirm("Deseja mesmo excluir este item?")){
		localStorage.setItem('Itens', JSON.stringify(item))
		alert("Registro excluído.");
	}else{
		alert("O item não foi excluído")
	}

}