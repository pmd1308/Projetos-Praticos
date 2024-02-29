$(document).ready(function(){
  
  function ativarValidacao() {
    $("input[required], textarea[required]").each(function() {
      $(this).on("blur", function() {
        validarCampo($(this));
      });
    });
  }

  function validarCampo(campo) {
    const valor = campo.val();
    const tipo = campo.attr("type");
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexTelefone = /^\d{2}\d{4}\d{4}/;

    if (tipo === "email") {
      if (!regexEmail.test(valor)) {
        campo.addClass("erro");
        return false;
      }
    } else if (tipo == "tel"){
      if (!regexTelefone.test(valor)){
        campo.addClass("erro");
        return false;  
      }
    } else if (valor === "") {
      campo.addClass("erro");
      return false;
    }

    campo.removeClass("erro");
    return true;
  }

// Enviar o formulário
  function enviarFormulario() {
  const nome = $("#nome").val();
  const email = $("#email").val();
  const telefone = $("#telefone").val();
  const mensagem = $("#mensagem").val();

  if (!validarCampo($("#nome")) ||
      !validarCampo($("#email")) ||
      !validarCampo($("#telefone")) ||
      !validarCampo($("#mensagem"))) {
    return;
  }

  $.ajax({
    url: "enviar.php",
    method: "POST",
    data: {
      nome,
      email,
      telefone,
      mensagem,
    },
    success: function(response) {
      if (response === "success") {
        $("#mensagens").html("<p class='success'>Mensagem enviada com sucesso!</p>");
        $("#contato-form").trigger("reset");
      } else {
        $("#mensagens").html("<p class='error'>Erro ao enviar a mensagem.</p>");
      }
    },
  });
}

ativarValidacao();

  $("#contato-form").submit(function(event) {
    event.preventDefault();
    enviarFormulario();
  });

});
