const form = document.getElementById('productForm');
const productList = document.getElementById('productList');
const loader = document.getElementById('loader');
const submitButton = document.getElementById('submitButton');

const apiUrl = 'http://localhost:8080/products';

let editMode = false;
let editingProductId = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    codigo: document.getElementById('codigo').value.trim(),
    nombre: document.getElementById('nombre').value.trim(),
    stockActual: parseInt(document.getElementById('stockActual').value),
    stockMinimo: parseInt(document.getElementById('stockMinimo').value)
  };

  try {
    let response;
    if (editMode) {
      response = await fetch(`${apiUrl}/${editingProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }

    if (response.ok) {
      const result = await response.json();
      Swal.fire('Éxito', `Producto ${editMode ? 'actualizado' : 'creado'} correctamente`, 'success');
      form.reset();
      editMode = false;
      editingProductId = null;
      submitButton.innerText = 'Crear Producto';
      fetchProducts();
    } else {
      const errorData = await response.json();
      Swal.fire('Error', errorData.message || `Error al ${editMode ? 'actualizar' : 'crear'} el producto`, 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'No se pudo conectar al servidor', 'error');
  }
});

async function fetchProducts() {
  showLoader();
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();

    productList.innerHTML = '';
    products.forEach(product => {
      const enAlerta = product.stockActual < product.stockMinimo;
      const row = document.createElement('tr');
      row.className = enAlerta ? 'table-danger' : '';

      row.innerHTML = `
        <td>${product.codigo}</td>
        <td>${product.nombre}</td>
        <td>${product.stockActual}</td>
        <td>${product.stockMinimo}</td>
        <td>
          <button class="btn btn-warning btn-sm me-1" onclick="loadProductToForm(${product.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="confirmDelete(${product.id})">Eliminar</button>
        </td>
      `;
      productList.appendChild(row);
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
  } finally {
    hideLoader();
  }
}

async function loadProductToForm(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (response.ok) {
      const product = await response.json();
      document.getElementById('codigo').value = product.codigo;
      document.getElementById('nombre').value = product.nombre;
      document.getElementById('stockActual').value = product.stockActual;
      document.getElementById('stockMinimo').value = product.stockMinimo;

      editMode = true;
      editingProductId = id;
      submitButton.innerText = 'Actualizar Producto';
    } else {
      Swal.fire('Error', 'Producto no encontrado', 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'No se pudo conectar al servidor', 'error');
  }
}

async function confirmDelete(id) {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡Esta acción no se puede deshacer!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    eliminarProducto(id);
  }
}

async function eliminarProducto(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });

    if (response.status === 204) {
      Swal.fire('Eliminado', 'Producto eliminado exitosamente', 'success');
      fetchProducts();
    } else {
      const errorData = await response.json();
      Swal.fire('Error', errorData.message || 'Producto no encontrado', 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'No se pudo conectar al servidor', 'error');
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

// Inicializar productos
fetchProducts();
