package com.example.SchoolManagementSystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "aluno") 
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Aluno {

    @Id
    @Column(name = "id")
    private Long id;
    
}
