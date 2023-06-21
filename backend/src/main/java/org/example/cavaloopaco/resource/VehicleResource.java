package org.example.cavaloopaco.resource;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.cavaloopaco.request.VehicleRequest;
import org.example.cavaloopaco.service.VehicleService;

@Path("/v1/")
public class VehicleResource {
    @Context
    private HttpHeaders headers;

    private VehicleService vehicleService = new VehicleService();

    @GET
    @Path("/vehicles")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getVehicle() {
        return Response
                .ok(vehicleService.getVehicle())
                .status(200)
                .build();
    }

    @GET
    @Path("/vehicles/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getVehicleById(@PathParam("id") long id) {
        return Response
                .ok(vehicleService.getVehicleById(id))
                .status(200)
                .build();
    }

    @POST
    @Path("/vehicles")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response postVehicle(VehicleRequest vehicleRequest) {
        Long response = vehicleService.postVehicle(vehicleRequest);
        return Response
                .ok()
                .status(201)
                .entity(response)
                .build();
    }

    @PUT
    @Path("/vehicles/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateVehicle(@PathParam("id") long id, VehicleRequest vehicleRequest) {
        Long response = vehicleService.updateVehicle(id, vehicleRequest);
        return Response
                .ok()
                .status(204)
                .entity(response)
                .build();
    }


    @DELETE
    @Path("/vehicles/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteVehicleById(@PathParam("id") long id) {
        Long response = vehicleService.deleteVehicleById(id);
        return Response
                .ok()
                .status(204)
                .entity(response)
                .build();
    }

}
