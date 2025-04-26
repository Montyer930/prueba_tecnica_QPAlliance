package com.qpalliance.inventario.controller;

import com.qpalliance.inventario.entity.Product;
import com.qpalliance.inventario.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productoService;

    public ProductController(ProductService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> obtenerProductos() {
        return ResponseEntity.ok(productoService.obtenerTodos());
    }

    @PostMapping
    public ResponseEntity<Product> crearProducto(@RequestBody Product producto) {
        Product nuevoProducto = productoService.crearProducto(producto);
        return ResponseEntity.status(201).body(nuevoProducto);
    }

    @GetMapping("/alerts")
    public ResponseEntity<List<Product>> obtenerAlertasStock() {
        return ResponseEntity.ok(productoService.obtenerAlertasStock());
    }
}
