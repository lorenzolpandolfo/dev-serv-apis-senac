function lerJSON(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var txt = "Nome: " + objJSON.nome + "<br>";
            txt += "Idade: " + objJSON.idade + "<br>";
            txt += "Formações: ";
            objJSON.formacoes.forEach( formacao => {
                txt += formacao + " - "
            });
            if( objJSON.casado ){
                txt += "<br>Cônjuge: " + objJSON.conjuge.nome;
            }
            txt += "<br>Filhos: ";
            objJSON.filhos.forEach( filho => {
                txt += "<br> " + filho.nome + " Idade: " + filho.idade;
            } );
            document.getElementById("divJSON").innerHTML = txt;
        }
    }
    req.open("GET" , "dados.json", true );
    req.send();
}



function lerProdutos(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var objJSON = JSON.parse( this.responseText );
            var produtos = objJSON.produtos;
            var txt = "";
            if( produtos.length == 0 ){
                txt = "<tr><th>Nenhum produto cadastrado!</th></tr>";
            }else{

                txt +=   "<tr> ";
                txt +=      "   <th> Código </th>";
                txt +=      "   <th> Nome </th>";
                txt +=      "   <th> Preço </th>";
                txt +=      "   <th> Exluir </th>";
                txt +=      "</tr>";
                produtos.forEach( prod => {
                    txt += "<tr>";
                    txt += "    <td>" + prod.id + "</td>";
                    txt += "    <td>" + prod.nome + "</td>";
                    txt += "    <td>" + prod.preco + "</td>";
                    txt += "    <td><button onclick='deletar(" + prod.id + ")' > X </button></td>";
                    txt += "</tr>";
                })
            }
            document.getElementById("tblProdutos").innerHTML = txt;
        }
    }

    req.open("GET" , "servidor.php?buscar" , true);
    req.send();
}

function deletar( idProd ){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 ){
            var objJSON = JSON.parse( this.responseText );
            if( objJSON.resposta ){
                alert("Produto excluído com sucesso!");
                lerProdutos();
            }

        }
    };
    req.open("GET", "servidor.php?excluir&idProduto=" + idProd, true);
    req.send()
    
}

function add( idProd ){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            var objJSON = JSON.parse( this.responseText );
            if( objJSON.resposta ){
                if( objJSON.id ){ 
                    alert( objJSON.resposta + "\nID: " + objJSON.id );
                    lerProdutos();
                }else
                    alert( objJSON.resposta  );
            }
        }
    };
    var nome = document.getElementById("txtNome").value;
    var preco = document.getElementById("txtPreco").value;

    if ( nome != "" ){
        document.getElementById("txtNome").value = ""
        document.getElementById("txtPreco").value = ""

        req.open("POST", "servidor.php?inserir", true);
        req.setRequestHeader("Content-type" ,"application/x-www-form-urlencoded");
        req.send("name=" + nome +"&price=" + preco);
    }
    
}