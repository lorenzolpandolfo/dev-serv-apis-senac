function validar(){
    valor = document.getElementById("txtValor").value
    var divResult = document.getElementById("divResult")
    if( isNaN(valor) ){
        divResult.innerHTML = "O valor digitado não é um número!"
    }else if( valor < 1 || valor > 10 ){

        divResult.innerHTML = "O valor digitado não é permitido!"
    }else{
        divResult.innerHTML = "Valor permitido!"
    }
}

function limpar(){
    document.getElementById("divResult").innerHTML = ""
}


$("#divJquery").css("background" , "#00f")
$("#divJquery").css("color" , "#fff")
//$("#divJquery").text("Oi Pessoal <hr>")
$("#divJquery").html("Oi Pessoal <hr> Bom dia")

function mostrarMensagem(){
    alert("Ação finalizada!")
}

$("#botao").on("click" , function(){
    $("#divJquery").toggle(3000, mostrarMensagem )
} )
