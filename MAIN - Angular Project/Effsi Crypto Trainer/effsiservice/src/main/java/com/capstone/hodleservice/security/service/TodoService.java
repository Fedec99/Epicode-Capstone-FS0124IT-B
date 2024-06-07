package com.capstone.hodleservice.security.service;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.capstone.hodleservice.security.entity.Todo;
import com.capstone.hodleservice.security.repository.TodoRepository;

@Service
public class TodoService {

	private Logger log = LoggerFactory.getLogger(TodoService.class);
	
	@Autowired TodoRepository repo;
	
	@Autowired @Qualifier("todo") private ObjectProvider<Todo> provider;
	
	//POST METHODS
	public Todo addTodo(Long userId , String title, String description) {

		provider.getObject();
		Todo t = Todo.builder()
					.userId(userId)
					.title(title)
					.description(description)
					.date(LocalDate.now())
					.status(false)
					.build();
			repo.save(t);
			System.out.println();
			log.info("Todo Id: " + t.getId() + " aggiunta correttamente.");
			return t;
			}
		
	//GET METHODS
	public Todo findById(long id) {
		Todo t = repo.findById(id).get();
		log.info(t.toString());
		return t;
	}
	
	public List<Todo> findByUserId(long id) {
		List<Todo> l = repo.findByUserId(id);
		l.forEach(t -> t.toString());
		return l;
	}
	
	public List<Todo> findByUserAndStatus(long userId, boolean status) {
		List<Todo> l = repo.findByUserIdAndStatus(userId, status);
		l.forEach(t -> t.toString());
		return l;
	}
	
	//PUT METHODS
	public Todo toggleStatus(Long id) {
		Todo t = repo.findById(id).get();
		t.setStatus(!t.isStatus());
		repo.save(t);
		log.info(t.toString());
		return t;
	}
	
	//DELETE METHOD
	public void deleteTodo(Long id) {
		repo.deleteById(id);
		log.info("Todo" + id + "eliminata con successo");
	}
	
}
