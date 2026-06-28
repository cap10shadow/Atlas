package com.atlas.authentication.mapper;

import com.atlas.authentication.dto.UserProfileResponse;
import com.atlas.authentication.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

	public UserProfileResponse toProfileResponse(User user) {
		return new UserProfileResponse(
				user.getId(),
				user.getEmail(),
				user.getFirstName(),
				user.getLastName(),
				user.getRole().getName().name());
	}
}
