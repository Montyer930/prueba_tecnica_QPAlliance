package com.qpalliance.inventario.repository;

import com.qpalliance.inventario.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Productos cuyo stock actual es menor que el stock mínimo
    @Query("SELECT p FROM Product p WHERE p.stockActual < p.stockMinimo")
    List<Product> findByStockActualLessThanStockMinimo();
}
