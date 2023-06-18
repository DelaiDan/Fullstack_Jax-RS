package org.example.cavaloopaco.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "vehicles")
public class VehicleEntity implements Serializable{

    @Id @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "vehicles_id_seq"
    )
    @SequenceGenerator(
            name = "vehicles_id_seq",
            allocationSize = 1
    )
    private Long id;

    @Column
    private String model;

    @Column
    private Long brand;

    @Column
    private Integer year;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Long getBrand() {
        return brand;
    }

    public void setBrand(Long brand) {
        this.brand = brand;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
