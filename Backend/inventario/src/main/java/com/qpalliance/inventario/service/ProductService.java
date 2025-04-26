package com.qpalliance.inventario.service;

import com.qpalliance.inventario.entity.Product;
import com.qpalliance.inventario.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

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
}
