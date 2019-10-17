package com.mathiasbald.gerenciamentofuncionarios.repositories;

import com.mathiasbald.gerenciamentofuncionarios.models.Funcionario;

import org.springframework.data.repository.CrudRepository;

/**
 * FuncionarioRepository: Interface responsável por atribuír os métodos básicos
 * de um CRUD para a classe de banco Funcionário
 */
public interface FuncionarioRepository extends CrudRepository<Funcionario, Long> {

}