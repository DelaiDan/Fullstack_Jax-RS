package org.example.cavaloopaco.resource;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.cavaloopaco.request.BrandRequest;
import org.example.cavaloopaco.service.BrandService;

@Path("/v1/")
public class BrandResource {
    @Context
    private HttpHeaders headers;

    private BrandService brandService = new BrandService();

    @GET
    @Path("/brands")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getBrand() {
        return Response
                .ok(brandService.getBrand())
                .status(200)
                .build();
    }


    @POST
    @Path("/brands")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response postBrand(BrandRequest brandRequest) {
        brandService.postBrand(brandRequest);
        return Response
                .ok()
                .status(200)
                .build();
    }

    @PUT
    @Path("/brands/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePerson(@PathParam("id") long id, BrandRequest brandRequest) {
        brandService.updateBrand(id, brandRequest);
        return Response
                .ok()
                .status(200)
                .build();
    }


    @DELETE
    @Path("/brands/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteBrandById(@PathParam("id") long id) {
        brandService.deleteBrandById(id);
        return Response
                .ok()
                .status(200)
                .build();
    }

}
