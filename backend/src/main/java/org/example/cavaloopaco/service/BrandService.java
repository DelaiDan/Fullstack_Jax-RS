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
    public void postBrand(BrandRequest brandRequest) {
        BrandEntity brandEntity = new BrandEntity();
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            brandEntity.setName(brandRequest.getName());
            entityManager.persist(brandEntity);
            transaction.commit();
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }

    public void updateBrand(long id, BrandRequest brandRequest) {
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
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }

    public void deleteBrandById(long id) {
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            BrandEntity brandEntity = entityManager.find(BrandEntity.class, id);
            if (brandEntity != null) {
                entityManager.remove(brandEntity);
            }
            transaction.commit();
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.close();
        }
    }
}
