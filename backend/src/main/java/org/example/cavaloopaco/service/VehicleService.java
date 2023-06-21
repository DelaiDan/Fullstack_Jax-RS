package org.example.cavaloopaco.service;

import org.example.cavaloopaco.entity.VehicleEntity;
import org.example.cavaloopaco.request.VehicleRequest;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;

public class VehicleService {

    public List<VehicleEntity> getVehicle() {
        EntityManager entityManager = Persistence
                .createEntityManagerFactory("jax-rs-trabalho")
                .createEntityManager();
        try {
            List<VehicleEntity> vehicleEntity = entityManager.createQuery("SELECT v FROM VehicleEntity v", VehicleEntity.class).getResultList();
            return vehicleEntity;
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }

    public VehicleEntity getVehicleById(long id) {
        VehicleEntity vehicleEntity = new VehicleEntity();
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            vehicleEntity = entityManager.find(VehicleEntity.class, id);
            transaction.commit();
            return vehicleEntity;
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }
    public Long postVehicle(VehicleRequest vehicleRequest) {
        VehicleEntity vehicleEntity = new VehicleEntity();
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            vehicleEntity.setModel(vehicleRequest.getModel());
            vehicleEntity.setBrand(vehicleRequest.getBrand());
            vehicleEntity.setYear(vehicleRequest.getYear());
            entityManager.persist(vehicleEntity);
            transaction.commit();
            return vehicleEntity.getId();
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }

    public Long updateVehicle(long id, VehicleRequest vehicleRequest) {
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            VehicleEntity vehicleEntity = entityManager.find(VehicleEntity.class, id);
            if (vehicleEntity != null) {
                vehicleEntity.setModel(vehicleRequest.getModel());
                vehicleEntity.setBrand(vehicleRequest.getBrand());
                vehicleEntity.setYear(vehicleRequest.getYear());
                entityManager.merge(vehicleEntity);
            }
            transaction.commit();
            return vehicleEntity.getId();
        } catch (Exception e) {
            throw e;
        } finally {
            entityManager.clear();
            entityManager.close();
        }
    }

    public Long deleteVehicleById(long id) {
        EntityManager entityManager = Persistence.createEntityManagerFactory("jax-rs-trabalho").createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            VehicleEntity vehicleEntity = entityManager.find(VehicleEntity.class, id);
            Long entityID = 0L;
            if (vehicleEntity != null) {
                entityID = vehicleEntity.getId();
                entityManager.remove(vehicleEntity);
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
