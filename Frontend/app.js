const form = document.getElementById('productForm');
const productList = document.getElementById('productList');

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
function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

async function fetchProducts() {
    try {
        showLoader();
        const response = await fetch(apiUrl);
        const products = await response.json();
        hideLoader();
        
        productList.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');

        // Compara stock
        const alertClass = product.stockActual < product.stockMinimo ? 'table-danger' : '';

        row.className = alertClass;
        row.innerHTML = `
            <td>${product.codigo}</td>
            <td>${product.nombre}</td>
            <td>${product.stockActual}</td>
            <td>${product.stockMinimo}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${product.id}')">Eliminar</button>
            </td>
        `;
            productList.appendChild(li);
        });
    } catch (error) {
        hideLoader();
        console.error('Error al obtener productos:', error);
    }
}


// Cargar productos al iniciar
fetchProducts();
