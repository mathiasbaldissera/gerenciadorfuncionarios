package com.mathiasbald.gerenciamentofuncionarios.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

/**
 * FuncionarioPostDTO
 */
@Data
@Entity(name = "funcionarios")
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @NotBlank
    @Size(min = 2, max = 30)
    @Column(length=30)
    private String nome;
    
    @NotBlank
    @Size(min = 2, max = 50)
    @Column(length=50)
    private String sobrenome;
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    @Size(min = 11, max = 11)
    @Pattern(regexp = "^\\d{11}$")
    @Column(length=11)
    private String nis;

}