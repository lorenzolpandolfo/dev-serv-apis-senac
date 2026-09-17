const URL = "http://localhost:8001";

const endPointCategoria = URL + "/category";
const endPointProduto = URL + "/product";

const listaCategorias = document.getElementById("listaCategorias");

const formularioCategoria = document.getElementById("formCategoria");

const campoIdCategoria = document.getElementById("idCat");

const campoNomeCategoria = document.getElementById("txtNome");

const listaProdutos = document.getElementById("listaProdutos");

const formularioProduto = document.getElementById("formProduto");

const campoIdProduto = document.getElementById("idProd");

const campoNomeProduto = document.getElementById("txtNomeProd");

const campoPreco = document.getElementById("txtPreco");

const campoCategoria = document.getElementById("selectCategoria");

async function loadCategorias() {
  try {
    const resposta = await fetch(endPointCategoria);

    if (!resposta.ok) {
      alert("Erro ao carregar categorias!");
      return;
    }

    const categorias = await resposta.json();

    listaCategorias.innerHTML = "";

    campoCategoria.innerHTML = `
      <option value="">
        Selecione uma categoria
      </option>
    `;

    categorias.forEach((cat) => {
      listaCategorias.innerHTML += `
        <tr>
          <td>${cat.id}</td>
          <td>${cat.nome}</td>
          <td>
            <button
              class="btn btn-info"
              onclick="preencherFormCategoria('${cat.id}', '${cat.nome}')"
            >
              Editar
            </button>

            <button
              class="btn btn-danger"
              onclick="excluirCategoria(${cat.id})"
            >
              Excluir
            </button>
          </td>
        </tr>
      `;

      campoCategoria.innerHTML += `
        <option value="${cat.id}">
          ${cat.nome}
        </option>
      `;
    });
  } catch (erro) {
    console.error(erro);
    alert("Erro ao carregar categorias.");
  }
}

async function excluirCategoria(id) {
  const confirma = confirm("Confirma exclusão?");

  if (!confirma) return;

  try {
    const resposta = await fetch(`${endPointCategoria}/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      alert("Categoria excluída com sucesso!");
      loadCategorias();
      loadProdutos();
    } else {
      alert("Erro ao excluir categoria.");
    }
  } catch (erro) {
    console.error(erro);
    alert("Erro ao excluir categoria.");
  }
}

function preencherFormCategoria(idCat, nomeCat) {
  campoIdCategoria.value = idCat;
  campoNomeCategoria.value = nomeCat;
}

formularioCategoria.addEventListener("submit", async function (event) {
  event.preventDefault();

  const idCat = campoIdCategoria.value;

  const categoria = {
    nome: campoNomeCategoria.value,
  };

  try {
    if (idCat) {
      await editarCategoria(idCat, categoria);
    } else {
      await addCategoria(categoria);
    }

    formularioCategoria.reset();
    campoIdCategoria.value = "";
  } catch (erro) {
    console.error(erro);
    alert("Erro ao adicionar ou editar categoria");
  }
});

async function addCategoria(categoria) {
  const resposta = await fetch(endPointCategoria, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });

  if (resposta.ok) {
    alert("Categoria adicionada com sucesso!");
    loadCategorias();
  }

  return await resposta.json();
}

async function editarCategoria(idCat, categoria) {
  try {
    const resposta = await fetch(`${endPointCategoria}/${idCat}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    });

    if (resposta.ok) {
      alert("Categoria atualizada com sucesso!");
      loadCategorias();
    }
  } catch (erro) {
    console.error(erro);
    alert("Erro ao editar categoria");
  }
}

async function loadProdutos() {
  try {
    const resposta = await fetch(endPointProduto);

    if (!resposta.ok) {
      alert("Erro ao carregar produtos!");
      return;
    }

    const produtos = await resposta.json();

    listaProdutos.innerHTML = "";

    produtos.forEach((prod) => {
      listaProdutos.innerHTML += `
        <tr>
          <td>${prod.id}</td>
          <td>${prod.nome}</td>
          <td>R$ ${Number(prod.preco).toFixed(2)}</td>
          <td>${prod.cat || "Sem categoria"}</td>
          <td>
            <button
              class="btn btn-info"
              onclick="preencherFormProduto(
                '${prod.id}',
                '${prod.nome}',
                '${prod.preco}',
                '${prod.codCategoria}'
              )"
            >
              Editar
            </button>

            <button
              class="btn btn-danger"
              onclick="excluirProduto(${prod.id})"
            >
              Excluir
            </button>
          </td>
        </tr>
      `;
    });
  } catch (erro) {
    console.error(erro);
    alert("Erro ao carregar produtos.");
  }
}

async function excluirProduto(id) {
  const confirma = confirm("Confirma a exclusão do produto?");

  if (!confirma) return;

  try {
    const resposta = await fetch(`${endPointProduto}/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      alert("Produto excluído com sucesso!");
      loadProdutos();
    } else {
      alert("Erro ao excluir produto.");
    }
  } catch (erro) {
    console.error(erro);
    alert("Erro ao excluir produto.");
  }
}

function preencherFormProduto(id, nome, preco, codCategoria) {
  campoIdProduto.value = id;
  campoNomeProduto.value = nome;
  campoPreco.value = preco;
  campoCategoria.value = codCategoria;
}

formularioProduto.addEventListener("submit", async function (event) {
  event.preventDefault();

  const idProd = campoIdProduto.value;

  const produto = {
    nome: campoNomeProduto.value,
    preco: campoPreco.value,
    codCategoria: campoCategoria.value,
  };

  try {
    if (idProd) {
      await editarProduto(idProd, produto);
    } else {
      await addProduto(produto);
    }

    formularioProduto.reset();
    campoIdProduto.value = "";
  } catch (erro) {
    console.error(erro);
    alert("Erro ao adicionar ou editar produto.");
  }
});

async function addProduto(produto) {
  const resposta = await fetch(endPointProduto, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (resposta.ok) {
    alert("Produto adicionado com sucesso!");
    loadProdutos();
  } else {
    alert("Erro ao adicionar produto.");
  }

  return await resposta.json();
}

async function editarProduto(idProd, produto) {
  try {
    const resposta = await fetch(`${endPointProduto}/${idProd}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });

    if (resposta.ok) {
      alert("Produto atualizado com sucesso!");
      loadProdutos();
    } else {
      alert("Erro ao editar produto.");
    }
  } catch (erro) {
    console.error(erro);
    alert("Erro ao editar produto.");
  }
}

loadCategorias();
loadProdutos();
