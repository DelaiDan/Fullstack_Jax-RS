package org.example.cavaloopaco.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "brands")
public class BrandEntity implements Serializable{

    @Id @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "brand_id_seq"
    )
    @SequenceGenerator(
            name = "brand_id_seq",
            allocationSize = 1
    )
    private Long id;

    @Column
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
