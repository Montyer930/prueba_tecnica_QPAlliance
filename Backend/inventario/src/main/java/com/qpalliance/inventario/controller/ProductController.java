package com.qpalliance.inventario.controller;

import com.qpalliance.inventario.dto.ProductRequest;
import com.qpalliance.inventario.entity.Product;
import com.qpalliance.inventario.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> obtenerProductos() {
        return ResponseEntity.ok(productService.obtenerTodos());
    }

    @PostMapping
    public ResponseEntity<Product> crearProducto(@Valid @RequestBody ProductRequest productRequest) {
        Product nuevoProducto = new Product(
            null,
            productRequest.getCodigo(),
            productRequest.getNombre(),
            productRequest.getStockActual(),
            productRequest.getStockMinimo()
        );
        Product creado = productService.crearProducto(nuevoProducto);
        return ResponseEntity.status(201).body(creado);
    }

    @GetMapping("/alerts")
    public ResponseEntity<List<Product>> obtenerAlertasStock() {
        return ResponseEntity.ok(productService.obtenerAlertasStock());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
    productService.eliminarProducto(id);
    return ResponseEntity.noContent().build(); // 204 No Content
}

}