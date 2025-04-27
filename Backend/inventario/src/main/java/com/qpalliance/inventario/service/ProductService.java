package com.qpalliance.inventario.service;

import com.qpalliance.inventario.entity.Product;
import com.qpalliance.inventario.repository.ProductRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productoRepository;

    public ProductService(ProductRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Product> obtenerTodos() {
        return productoRepository.findAll();
    }

    public Product crearProducto(Product producto) {
        return productoRepository.save(producto);
    }

    public List<Product> obtenerAlertasStock() {
        return productoRepository.findByStockActualLessThanStockMinimo();
    }
    public void eliminarProducto(Long id) {
        Optional<Product> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            productoRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        }
    }
    public Product actualizarProducto(Long id, Product productoActualizado) {
        return productoRepository.findById(id)
            .map(producto -> {
                producto.setCodigo(productoActualizado.getCodigo());
                producto.setNombre(productoActualizado.getNombre());
                producto.setStockActual(productoActualizado.getStockActual());
                producto.setStockMinimo(productoActualizado.getStockMinimo());
                return productoRepository.save(producto);
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }
    
}
