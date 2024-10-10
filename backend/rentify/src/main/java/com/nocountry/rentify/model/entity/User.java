package com.nocountry.rentify.model.entity;

import com.nocountry.rentify.model.enums.AccountStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;


@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 100, nullable = false, unique = true)
  private String email;

  private String password;

  @Column(length = 50, nullable = false)
  @Enumerated(EnumType.STRING)
  private AccountStatus status;

  @Column(updatable = false, nullable = false)
  private LocalDateTime createdAt;

  private boolean isVerify;

  @PrePersist
  public void onCreate(){
    this.isVerify = false;
    this.status = AccountStatus.ACTIVE;
    this.createdAt = LocalDateTime.now();
  }

  @ManyToOne
  @JoinColumn(name="role_id", nullable = false)
  private Role role;

  @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
  private UserProfile profile;

  @OneToMany(mappedBy="owner", fetch = FetchType.LAZY)
  private Set<Property> property;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.getName()));

  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }
}
