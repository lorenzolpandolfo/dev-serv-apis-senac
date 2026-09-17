var pessoa = { 
    nome : "Airton" ,
    sobrenome: "Senna" ,
    idade : 66 ,
    altura : 1.76 ,
    titulos : [1988, 1990, 1991] ,
    equipes : [ "Jordan" , "McLaren" , "Williams" ],
    conjuge : {
        nome : "Adriane Galisteu",
        idade : 55
    } ,
    getNomeCompleto : function(){
        return this.nome + " " + this.sobrenome
    }
}

function carregar(){
    var texto = "Nome: " + pessoa.getNomeCompleto() + "<br>";
    texto += "Idade: " + pessoa.idade + "<br>";
    texto += "Cônjuge: " + pessoa.conjuge.nome + "<br>";
    texto += "Títulos: ";
    pessoa.titulos.forEach( ano => {
        texto += ano + " - " ;
    } );
    document.getElementById("divConteudo").innerHTML = texto;
}