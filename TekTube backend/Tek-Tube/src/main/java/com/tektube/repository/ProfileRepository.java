package com.tektube.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tektube.entity.Profile;

public interface ProfileRepository extends MongoRepository<Profile, Long>{

}
