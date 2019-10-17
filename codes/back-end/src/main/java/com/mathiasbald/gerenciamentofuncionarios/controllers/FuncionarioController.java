package com.mathiasbald.gerenciamentofuncionarios.controllers;

import java.util.Optional;

import javax.validation.Valid;

import com.mathiasbald.gerenciamentofuncionarios.dto.FuncionarioDTO;
import com.mathiasbald.gerenciamentofuncionarios.models.Funcionario;
import com.mathiasbald.gerenciamentofuncionarios.repositories.FuncionarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * FuncionarioController: Classe responsável por atender as requisições REST para
 * a tabela Funcionário Aceita requisições CORS de http://localhost:3000 O
 * endpoint geral é /api/funcionarios
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    /**
     * Referencia para a repository dos funcionários.
     */
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    /**
     * Mapeia as requisições GET para o endpoint geral Busca todos os funcionários
     * cadastrados.
     * 
     * @return Uma lista com todos os funcionários
     */
    @GetMapping(value = "")
    public ResponseEntity<Object> getFuncionarios() {
        return ResponseEntity.ok(funcionarioRepository.findAll());
    }

    /**
     * Mapeia as requisições GET para o endpoint geral recebendo uma variável de
     * caminho (id) Busca um funcionário com um ID especifico, se ele for
     * encontrado, retorna o mesmo Se não encontrar o funcionário, gera uma
     * BadRequest
     * 
     * @param id ID do funcionário a ser resgatado
     * @return Os dados de UM funcionário ou uma mensagem de erro
     */
    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getFuncionarioPorId(@PathVariable long id) {
        Optional<Funcionario> optFuncionario = funcionarioRepository.findById(id);

        if (!optFuncionario.isPresent()) {
            return ResponseEntity.badRequest().body("O funcionário com ID " + id + " não foi encontrado");
        }
        return ResponseEntity.ok(optFuncionario.get());
    }

    /**
     * Mapeia as requisições POST para o endpoint geral Insere um funcionário no
     * banco de dados
     * 
     * @param funcionarioDTO dados do funcionário validados automaticamente pelo
     *                       Spring
     * @return O funcionário cadastrado junto com o ID atribuído
     */
    @PostMapping(value = "")
    public Funcionario postFuncionario(@Valid @RequestBody FuncionarioDTO funcionarioDTO) {

        Funcionario funcionario = new Funcionario();
        funcionario.setNome(funcionarioDTO.getNome());
        funcionario.setSobrenome(funcionarioDTO.getSobrenome());
        funcionario.setEmail(funcionarioDTO.getEmail());
        funcionario.setNis(funcionarioDTO.getNis());

        Funcionario funcionarioSalvo = funcionarioRepository.save(funcionario);
        return funcionarioSalvo;
    }

    /**
     * Mapeia as requisições DELETE para o endpoint geral recebendo uma variável de
     * caminho (id) Busca um funcionário com um ID especifico, se ele for
     * encontrado, deleta e retorna o mesmo. Se não encontrar o funcionário, gera uma
     * BadRequest
     * 
     * @param id ID do funcionário a ser deletado
     * @return Os dados do funcionário deletado ou uma mensagem de erro
     */
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteFuncionario(@PathVariable long id) {
        Optional<Funcionario> optFuncionario = funcionarioRepository.findById(id);

        if (!optFuncionario.isPresent()) {
            return ResponseEntity.badRequest().body("O funcionário com ID " + id + " não foi encontrado");
        }

        funcionarioRepository.delete(optFuncionario.get());

        return ResponseEntity.ok(optFuncionario.get());

    }

    /**
     * Mapeia as requisições DELETE para o endpoint geral recebendo uma variável de
     * caminho (id) Busca um funcionário com um ID especifico, se ele for
     * encontrado, atualiza seus dados e retorna o mesmo. Se não encontrar o
     * funcionário, gera uma BadRequest
     * 
     * @param id             ID do funcionário a ser deletado
     * @param funcionarioDTO os novos dados do funcionário
     * @return Os dados do funcionário atualizado ou uma mensagem de erro
     */
    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> putFuncionario(@PathVariable long id,
            @Valid @RequestBody FuncionarioDTO funcionarioDTO) {

        Optional<Funcionario> optFuncionario = funcionarioRepository.findById(id);
        if (!optFuncionario.isPresent()) {
            return ResponseEntity.badRequest().body("O funcionário com ID " + id + " não foi encontrado");
        }
        Funcionario funcionario = optFuncionario.get();

        funcionario.setNome(funcionarioDTO.getNome());
        funcionario.setSobrenome(funcionarioDTO.getSobrenome());
        funcionario.setEmail(funcionarioDTO.getEmail());
        funcionario.setNis(funcionarioDTO.getNis());

        Funcionario funcionarioAtualizado = funcionarioRepository.save(funcionario);

        return ResponseEntity.ok(funcionarioAtualizado);
    }

}