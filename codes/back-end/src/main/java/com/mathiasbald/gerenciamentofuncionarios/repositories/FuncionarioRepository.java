package com.mathiasbald.gerenciamentofuncionarios.repositories;

import com.mathiasbald.gerenciamentofuncionarios.models.Funcionario;

import org.springframework.data.repository.CrudRepository;

/**
 * FuncionarioRepositpry
 */
public interface FuncionarioRepository extends CrudRepository<Funcionario, Long> {

}