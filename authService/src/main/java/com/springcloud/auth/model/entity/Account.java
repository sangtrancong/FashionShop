package com.springcloud.auth.model.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Account extends BaseIdEntity implements UserDetails {

	private static final long serialVersionUID = 1L;

	private String fullname;
	private String email;
	private String username;
	private String password;
	private Date birthday;
	private String phone;
	private int gender;
	private String address;
	private boolean status;

	@Column(name = "account_locked")
	private boolean accountNonLocked;

	@Column(name = "account_expired")
	private boolean accountNonExpired;

	@Column(name = "credentials_expired")
	private boolean credentialsNonExpired;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "role_id")
	private Role role;

	@Override
	public boolean isEnabled() {
		return status;
	}

	@Override
	public boolean isAccountNonExpired() {
		return !accountNonExpired;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return !credentialsNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return !accountNonLocked;
	}

	/*
	 * Get roles and permissions and add them as a Set of GrantedAuthority
	 */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();

		authorities.add(new SimpleGrantedAuthority(role.getName()));

		return authorities;
	}

}
