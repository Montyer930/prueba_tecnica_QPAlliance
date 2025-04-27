const form = document.getElementById('productForm');
const productList = document.getElementById('productList');
const loader = document.getElementById('loader');

const apiUrl = 'http://localhost:8080/products';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    codigo: document.getElementById('codigo').value.trim(),
    nombre: document.getElementById('nombre').value.trim(),
    stockActual: parseInt(document.getElementById('stockActual').value),
    stockMinimo: parseInt(document.getElementById('stockMinimo').value)
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      Swal.fire('Éxito', `Producto ${result.nombre} creado correctamente`, 'success');
      form.reset();
      fetchProducts();
    } else {
      const errorData = await response.json();
      Swal.fire('Error', errorData.message || 'Error al crear el producto', 'error');
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
