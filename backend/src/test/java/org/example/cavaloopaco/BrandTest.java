package org.example.cavaloopaco;

import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.cavaloopaco.entity.BrandEntity;
import org.example.cavaloopaco.resource.VehicleResource;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.junit.jupiter.api.Test;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class BrandTest extends JerseyTest {
    @Override
    protected Application configure() {
        return new ResourceConfig(VehicleResource.class);
    }

    @Test
    public void testFetchAll() {
        Response response = target("/v1/brands").request().get();
        assertEquals(Float.parseFloat("should return status 200"), 200, response.getStatus());
        assertNotNull("Should return list", response.getEntity().toString());

        System.out.println(response.getStatus());
        System.out.println(response.readEntity(String.class));
    }

    @Test
    public void testGetById() {
        Response output = target("/v1/brands/1").request().get();
        assertEquals(Float.parseFloat("Should return status 200"), 200, output.getStatus());
        assertNotNull("Should return object as json", output.getEntity().toString());

        System.out.println(output.getStatus());
        System.out.println(output.readEntity(String.class));
    }

    @Test
    public void testCreate() {
        BrandEntity brand = new BrandEntity();
        brand.setName("Chevrolet");

        Response output = target("/v1/brands/101").request().post(Entity.entity(brand, MediaType.APPLICATION_JSON));
        System.out.println(output.getStatus());
        assertEquals(Float.parseFloat("Should return status 201"), 201, output.getStatus());
    }

    @Test
    public void testUpdate() {
        BrandEntity brand = new BrandEntity();
        brand.setName("Chevrolet");

        Response output = target("/v1/brands/101").request().put(Entity.entity(brand, MediaType.APPLICATION_JSON));
        assertEquals(Float.parseFloat("Should return status 204"), 204, output.getStatus());
        System.out.println(output.getStatus());
    }

    @Test
    public void testDelete() {
        Response output = target("/v1/brands/101").request().delete();
        assertEquals(Float.parseFloat("Should return status 204"), 204, output.getStatus());
    }
}
