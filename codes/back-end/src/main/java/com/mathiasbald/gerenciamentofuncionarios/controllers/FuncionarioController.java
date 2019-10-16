package com.mathiasbald.gerenciamentofuncionarios.controllers;

import java.util.Arrays;
import java.util.Optional;

import javax.validation.Valid;

import com.mathiasbald.gerenciamentofuncionarios.dto.FuncionarioDTO;
import com.mathiasbald.gerenciamentofuncionarios.models.Funcionario;
import com.mathiasbald.gerenciamentofuncionarios.repositories.FuncionarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * FuncionarioController
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @GetMapping(value = "")
    public ResponseEntity<Object> getFuncionarios() {
        return ResponseEntity.ok(funcionarioRepository.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getFuncionarioPorId(@PathVariable long id) {
        Optional<Funcionario> optFuncionario = funcionarioRepository.findById(id);

        if (!optFuncionario.isPresent()) {
            return ResponseEntity.badRequest().body("O funcionário com ID " + id + " não foi encontrado");
        }
        return ResponseEntity.ok(optFuncionario.get());
    }

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

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteFuncionario(@PathVariable long id) {
        Optional<Funcionario> optFuncionario = funcionarioRepository.findById(id);

        if (!optFuncionario.isPresent()) {
            return ResponseEntity.badRequest().body("O funcionário com ID " + id + " não foi encontrado");
        }

        funcionarioRepository.delete(optFuncionario.get());

        return ResponseEntity.ok(optFuncionario.get());

    }

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