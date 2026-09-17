function ler(){
    var req = new XMLHttpRequest();
  
    req.onreadystatechange = function(){
        if( this.readyState == 3){
            alert("Servidor processando sua requisição!");
        }
        if( this.readyState == 4 && this.status == 200){
            var divConteudo = document.getElementById("conteudo");
            divConteudo.innerHTML = this.responseText;
        }
    }

    req.open("GET", "informacoes.txt" , true );
    req.send();
}

function gerar(){
    var valor = document.getElementById("txtNumero").value;
    var div = document.getElementById("divNumeros");
    div.innerHTML = "Carregando...";
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){ 
            div.innerHTML = this.responseText;
        }
    }

    req.open("GET" , "servidor.php?numero=" + valor , true);
    req.send()
}