package com.mathiasbald.gerenciamentofuncionarios.dto;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

/**
 * FuncionarioDTO
 */
@Data
public class FuncionarioDTO {

    @Size(min = 2, max = 30, message = "O campo nome deve possuir entre 2 e 30 caracteres")
    private String nome;
    
    @Size(min = 2, max = 50,  message = "O campo sobrenome deve possuir entre 2 e 50 caracteres")
    private String sobrenome;
    
    @Email(message = "O email informado é invalido", regexp = "[^@]+@[^@]+\\.[a-zA-Z]{2,6}")
    private String email;
    
    @Pattern(regexp = "^\\d{11}$", message = "O NIS deve possuir exatamente 11 numeros")
    private String nis;
    
    
}