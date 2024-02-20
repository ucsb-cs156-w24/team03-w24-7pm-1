package edu.ucsb.cs156.example.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.ucsb.cs156.example.entities.Articles;

public interface ArticlesRepository extends CrudRepository<Articles, Long>{
    
}
