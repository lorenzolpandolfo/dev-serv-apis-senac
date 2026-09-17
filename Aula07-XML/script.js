function lerXML(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            var dadosXML = this.responseXML;
            var pessoa = dadosXML.getElementsByTagName("pessoa");
            var tagNome = pessoa[0].getElementsByTagName("nome");
            var nome = tagNome[0].childNodes[0].nodeValue;
            var idade = pessoa[0].getElementsByTagName("idade")[0].childNodes[0].nodeValue;
            var tagFormacoes = pessoa[0].getElementsByTagName("formacoes");
            var tagsFormacao = tagFormacoes[0].getElementsByTagName("formacao");
            var conteudo = "Nome: " + nome + "<br>Idade: " + idade + "<br>Formações: "
            for( i = 0; i < tagsFormacao.length; i++){
                conteudo += tagsFormacao[i].childNodes[0].nodeValue + " - ";
            }
            conteudo += "<br>Filhos: "
            var tagsFilho = pessoa[0].getElementsByTagName("filhos")[0]
                .getElementsByTagName("filho");
            if( tagsFilho.length == 0 ){
                conteudo += "Não possui filhos";
            }else{
                for( i = 0; i < tagsFilho.length; i++){
                    conteudo += "<br>Nome: "
                    conteudo += tagsFilho[i].getElementsByTagName("nome")[0]
                        .childNodes[0].nodeValue;
                    conteudo += " - Idade: "
                    conteudo += tagsFilho[i].getElementsByTagName("idade")[0]
                        .childNodes[0].nodeValue;
                }
            }
            document.getElementById("conteudo").innerHTML = conteudo;
        }
    }
    req.open("GET", "dados.xml" , true);
    req.send()
}