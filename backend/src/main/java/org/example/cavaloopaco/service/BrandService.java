package org.example.cavaloopaco.service;

import org.example.cavaloopaco.entity.BrandEntity;
import org.example.cavaloopaco.request.BrandRequest;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;

public class BrandService {

    public List<BrandEntity> getBrand() {
        EntityManager entityManager = Persistence
                .createEntityManagerFactory("jax-rs-trabalho")
                .createEntityManager();
        try {
            List<BrandEntity> brandEntity = entityManager.createQuery("SELECT p FROM BrandEntity p", BrandEntity.class).getResultList();
            return brandEntity;
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }

    public BrandEntity getBrandById(long id) {
        BrandEntity brandEntity = new BrandEntity();
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            brandEntity = entityManager.find(BrandEntity.class, id);
            transaction.commit();
            return brandEntity;
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }
    public Long postBrand(BrandRequest brandRequest) {
        BrandEntity brandEntity = new BrandEntity();
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            brandEntity.setName(brandRequest.getName());
            entityManager.persist(brandEntity);
            transaction.commit();
            return brandEntity.getId();
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }

    public Long updateBrand(long id, BrandRequest brandRequest) {
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            BrandEntity brandEntity = entityManager.find(BrandEntity.class, id);
            if (brandEntity != null) {
                brandEntity.setName(brandRequest.getName());
                entityManager.merge(brandEntity);
            }
            transaction.commit();
            return brandEntity.getId();
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }

    public Long deleteBrandById(long id) {
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            BrandEntity brandEntity = entityManager.find(BrandEntity.class, id);
            Long entityID = 0L;
            if (brandEntity != null) {
                entityID = brandEntity.getId();
                entityManager.remove(brandEntity);
            }
            transaction.commit();
            return entityID;
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.close();
        }
    }
}
