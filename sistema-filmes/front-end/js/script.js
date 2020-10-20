$(function () {

  function showFilmes() {
    $.ajax({
      url: 'http://localhost:5000/get-filmes',
      method: 'GET',
      dataType: 'json', 
      success: listFilme, 
      error: function () {
        alert('erro ao ler dados, verifique o backend');
      },
    });
  });

  function listFilmes(filmes) {
    $("#tableBody").empty();
    showContent("filme-table");
    for (filme of filmes) {
        var newRow = `<tr id="line_${filme.id}"> 
                        <td>${filme.title}</td> 
                        <td>${filme.author}</td> 
                        <td>${filme.description}</td> 
                        <td>${filme.genre}</td> 
                        <td>${filme.publisher}</td> 
                        <td>
                            <a href="#" id="delete_${filme.id}" class="delete_filme" title="Excluir filme">
                                <span class="material-icons">
                                    delete
                                </span>
                            </a>
                        </td>
                      </tr>`;
            $("#tableBody").append(newRow);
          }
      }
  }

  function showContent(nextPage) {
    $('#inicio').addClass('invisible');
    $('#filme-table').addClass('invisible');
    $(`#${nextPage}`).removeClass('invisible');
  }

  $("#link-listar").click(function() {
    showFilmes();
  });

  $('#link-inicial').click(function () {
    changeContent('inicio');
  });

  $('#nav-brand').click(function () {
    changeContent('inicio');
  });

  $(document).on('click', '#btn-incluir', function () {
    const nome = $('#campo-nome').val();
    const genero = $('#campo-genero').val();
    const distribuidora = $('#campo-distribuidora').val();
    const diretores = $('#campo-diretores').val();
    

    const filmeData = JSON.stringify({
      nome: nome,
      genero: genero,
      distribuidora: distribuidora,
      diretores: diretores,
    
    });

    $.ajax({
      url: 'http://localhost:5000/create-filmes',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: filmeData,
      success: createFilme,
      error: createFilmeError,
    });


    function createFilme(resposta) {
      if (resposta.result == 'ok') {
          $('#campo-nome').val('');
          $('#campo-genero').val('');
          $('#campo-distribuidora').val('');
          $('#campo-diretores').val('');
          showFilmes();
          alert('Filme adicionado com sucesso');
          $('.close'.click();       
      } 
      else {
        alert(resposta.result + ':' + resposta.details);
      }
  }

    function createFilmeError(resposta){
      alert('Erro na chamada do back-end');
    }
  });

  $('#modal-incluir').on('hidden.bs.modal', function(e) {
    if (!$('#filme-table').hasClass('invisible')) {
        showFilmes();
    }
  });

  showContent("inicio");

  $(document).on("click", ".delete_filme", function() {
    var component = $(this).attr("id");

    var icon_name = "delete_";
    var filme_id = component.substring(icon_name.length);

    $.ajax({
      url: 'http://localhost:5000/delete-filmes/' + filme_id,
      type: "DELETE",
      dataType: "json",
      success: deletedFilme,
      error: deletedFilmeError
  })

    function deletedFilme(retorno) {
      if (retorno.result == "ok") {
          $('#line_' + filme_id).fadeOut(1000, function() {
              alert("Filme Removido com Sucesso!");
              showFilmes();
          });
      } else {
          alert(`${retorno.result}: ${retorno.details}`);
      }
  }

        function deletedFilmeError(response) {
          alert("Erro ao excluir dados, verifique o Backend!");
      }
  });

});
